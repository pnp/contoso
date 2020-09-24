import { IncomingMessage, ServerResponse } from "http";
import { Session } from "next-iron-session";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { IActivationProps } from "./types";
import { toBase64 } from "./utils";

export interface IMSALAuth {
    token: string;
    expiresOn: Date;
}

export interface AuthState {
    target: string;
    params: IActivationProps;
}

const isProd = process.env.NODE_ENV === "production";
export const authSessionKey = "auth";
export const paramsSessionKey = "props";

export async function authClientFactory(init?: { domainHint?: string }): Promise<ConfidentialClientApplication> {
    // req.url
    let clientId = "";
    let clientSecret = "";

    if (isProd) {
        clientId = process.env.AAD_MSAL_AUTH_ID;
        clientSecret = process.env.AAD_MSAL_AUTH_SECRET;
    } else {
        const { appId, appSecret } = await import("../../.local-dev-secrets/settings");
        clientId = appId;
        clientSecret = appSecret;
    }

    const authority = `https://login.microsoftonline.com/common`; // ${init.domainHint || "organizations"}`;

    return new ConfidentialClientApplication({
        auth: {
            clientId: clientId,
            clientSecret: clientSecret,
            authority: authority,
        }
    });
}

export async function withAuth(req: IncomingMessage & { session: Session }, res: ServerResponse, activationParams: IActivationProps): Promise<[string, IActivationProps] | never> {

    const authInfo: IMSALAuth = req.session.get(authSessionKey);

    if (authInfo === undefined || authInfo.expiresOn < new Date()) {

        const authApp = await authClientFactory({ domainHint: activationParams.domainHint });

        const state = toBase64(JSON.stringify(<AuthState>{ target: req.url, params: activationParams }));

        const authUrl = await authApp.getAuthCodeUrl({
            scopes: ["openid", "Files.ReadWrite"],
            redirectUri: "https://localhost:3000/api/auth/login",
            state,
            loginHint: decodeURIComponent(activationParams.userId),
            domainHint: activationParams.domainHint,
        });

        res.setHeader("location", authUrl);
        res.statusCode = 302;
        res.end();
    }

    const props: IActivationProps = req.session.get(paramsSessionKey);

    return [authInfo.token, props];
}
