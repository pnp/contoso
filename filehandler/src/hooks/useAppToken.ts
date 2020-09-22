import { useEffect, useState } from "react";
import { ConfidentialClientApplication } from "@azure/msal-node";

export interface IConfig {
    appId: string;
}

export async function getToken(appId: string): Promise<[() => { headers: { "authorization": string } }, string]> {

    const auth = new ConfidentialClientApplication({
        auth: {
            authority: "https://login.microsoftonline.com/",
            clientId: appId,
            clientSecret: "",
        },
        system: {
            loggerOptions: {
                piiLoggingEnabled: false,
            },
        },
    });

    // get app token
    const tokenResponse = await auth.acquireTokenByClientCredential({ scopes: ["https://graph.microsoft.com/.default"] });

    return [() => ({ headers: { "authorization": `Bearer ${tokenResponse.accessToken}` } }), tokenResponse.accessToken];
}

export default function useAppToken(config: IConfig): [() => { headers: { "authorization": string } }, string] {

    const { appId } = config;

    const [token, setToken] = useState("");

    useEffect(() => {

        (async () => {

            setToken(await getToken(appId)[1]);
        })();

    }, [config]);

    return [() => ({ headers: { "authorization": `Bearer ${token}` } }), token];
}
