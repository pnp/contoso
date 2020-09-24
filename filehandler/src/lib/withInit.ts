import { IncomingMessage, ServerResponse } from "http";
import { Session } from "next-iron-session";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { IActivationProps } from "./types";
import { fromBase64, readRequestBody, toBase64 } from "./utils";
import { parse } from "url";
import { parse as parseQuery } from "querystring";

export interface ILoginState {
    target: string;
    activationParams: IActivationProps;
}

export interface SessionState {
    auth?: {
        token: string;
        expires: Date;
    },
}

const isProd = process.env.NODE_ENV === "production";
export const sessionKey = "session";

export async function authClientFactory(): Promise<ConfidentialClientApplication> {
    // req.url
    let tenantId = "";
    let clientId = "";
    let clientSecret = "";

    if (isProd) {
        tenantId = process.env.AAD_MSAL_AUTH_TENANT_ID;
        clientId = process.env.AAD_MSAL_AUTH_ID;
        clientSecret = process.env.AAD_MSAL_AUTH_SECRET;
    } else {
        const { appId, appSecret, appTenantId } = await import("../../.local-dev-secrets/settings");
        tenantId = appTenantId
        clientId = appId;
        clientSecret = appSecret;
    }

    // for production you should target the common endpoint
    const authority = `https://login.microsoftonline.com/${tenantId}`;

    return new ConfidentialClientApplication({
        auth: {
            clientId: clientId,
            clientSecret: clientSecret,
            authority: authority,
        }
    });
}

export async function withInit(req: IncomingMessage & { session: Session }, res: ServerResponse): Promise<[string, IActivationProps] | never> {

    const query = parseQuery(parse(req.url).query);

    if (query.token) {
        // this is a redirect from login so we need to setup our session

        const loginState: ILoginState = JSON.parse(fromBase64(query.state as string));

        const sessionData: SessionState = {
            auth: {
                token: query.token as string,
                expires: new Date(query.expiresOn as string),
            }
        }

        req.session.set(sessionKey, sessionData);
        await req.session.save();

        return [query.token as string, loginState.activationParams];
    }

    const session: SessionState = req.session.get(sessionKey);

    if (session === undefined || typeof session.auth === undefined || session.auth.expires < new Date()) {

        // we assume this is the initial request to the app and we need to read the activation params from the
        // request body
        const buffer = await readRequestBody(req);

        const activationParams: Partial<IActivationProps> = buffer.split("&").map(v => v.split("=")).reduce((prev: Partial<IActivationProps>, curr: any[]) => {
            prev[curr[0]] = curr[0] === "items" ? JSON.parse(decodeURIComponent(curr[1])) : curr[1];
            return prev;
        }, {});

        // we will send this state to the server and get it back
        const state = toBase64(JSON.stringify(<ILoginState>{ target: req.url, activationParams }));

        const authApp = await authClientFactory();

        const authUrl = await authApp.getAuthCodeUrl({
            scopes: ["openid", "Files.ReadWrite.All"],
            redirectUri: "https://localhost:3000/api/auth/login",
            state,
            loginHint: decodeURIComponent(activationParams.userId),
            domainHint: activationParams.domainHint,
        });

        res.setHeader("location", authUrl);
        res.statusCode = 302;
        res.end();

    } else {

        // this is the case of save or other where we just need the token
        return [session.auth.token, null];
    }
}
