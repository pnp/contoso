import { AzureFunction, Context } from "@azure/functions"
import { QueueMessage } from "../types";
import fetch, { RequestInit } from "node-fetch";
import { ConfidentialClientApplication, OnBehalfOfRequest } from "@azure/msal-node";


async function getOnBehalfToken(tenantId: string, messageToken: string): Promise<string> {

    const cca = new ConfidentialClientApplication({
        auth: {
            clientId: process.env["MICROSOFT_PROVIDER_AUTHENTICATION_APPID"],
            clientSecret: process.env["MICROSOFT_PROVIDER_AUTHENTICATION_SECRET"],
            authority: `https://login.microsoftonline.com/${tenantId}`
        }
    });

    const oboRequest: OnBehalfOfRequest = {
        oboAssertion: messageToken,
        scopes: ["files.readwrite.all", "offline_access", "user.read"],
    }

    const response = await cca.acquireTokenOnBehalfOf(oboRequest);

    return response.accessToken;
}

function encodeSharingUrl(url: string): string {
    return "u!" + Buffer.from(url, "utf8").toString("base64").replace(/=$/i, "").replace("/", "_").replace("+", "-");
}

function requestBinder(token: string): <T = any>(url: string, init?: RequestInit) => Promise<T> {

    return async function <T>(url: string, init: RequestInit = {}): Promise<T> {

        if (!init.headers) {
            init.headers = {};
        }

        init.headers["authorization"] = `Bearer ${token}`;

        const result = await fetch(url, init);

        if (!result.ok) {
            const errorBody = await result.text();
            throw Error(`[${result.status}] ${result.statusText} ${errorBody}`);
        }

        return result.json();
    }
}

function getRandomString(chars: number): string {
    const text = new Array(chars);
    for (let i = 0; i < chars; i++) {
        text[i] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62));
    }
    return text.join("");
}

const serviceBusQueueTrigger: AzureFunction = async function (context: Context, msgStr: string): Promise<void> {

    try {

        // parse our passed in message
        const message: QueueMessage = JSON.parse(msgStr);

        // we need to exchange our token for one to call the graph
        const onBehalfToken = await getOnBehalfToken(message.request.aadInfo.tenantId, message.auth.requestBearerToken);

        const request = requestBinder(onBehalfToken);


        // we need to get the absolute path to the document library from which we were called
        const libAbsPath = (new URL(message.request.listUrl, message.request.webAbsUrl)).toString();

        // we encode the absolute path using the sharing url trick (https://docs.microsoft.com/en-us/graph/api/shares-get?view=graph-rest-1.0&tabs=http#encoding-sharing-urls)
        const shareUrl = encodeSharingUrl(libAbsPath);

        // now we get some information about the document library, namely its id using the parent information of the root folder of our share
        const docLibInfo = await request<{ parentReference: { driveId: string } }>(`https://graph.microsoft.com/v1.0/shares/${shareUrl}/root`);

        // grab the doc lib id from which the button was invoked
        const docLibGraphId = docLibInfo.parentReference.driveId;

        // add a file to the doc lib as the user
        const upoloadResultInfo = await request(`https://graph.microsoft.com/v1.0/drives/${docLibGraphId}/root:/${getRandomString(6)}.txt:/content`, {
            method: "PUT",
            headers: {
                "Content-Type": "text/plain",
            },
            body: `Here is our content! And some random text so we know it is new "${getRandomString(10)}".`
        });

        context.log("Upload Result", upoloadResultInfo);

        // production: resumable upload: https://docs.microsoft.com/en-us/graph/api/driveitem-createuploadsession?view=graph-rest-1.0

    } catch (e) {
        context.log("Error running serviceBusQueueTrigger");
        context.done(e);
    }
};

export default serviceBusQueueTrigger;
