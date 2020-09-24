import { Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "../../../lib/withSession";
import { ILoginState, authClientFactory } from "../../../lib/withInit";
import { fromBase64 } from "../../../lib/utils";

async function handler(req: NextApiRequest & { session: Session }, res: NextApiResponse) {

    const state: ILoginState = JSON.parse(fromBase64(req.query.state as string));

    const authApp = await authClientFactory();

    const tokenResponse = await authApp.acquireTokenByCode({
        code: req.query.code as string,
        scopes: ["openid", "Files.ReadWrite.All"],
        redirectUri: "https://localhost:3000/api/auth/login",
    });

    res.redirect(`${state.target}?state=${req.query.state}&token=${tokenResponse.accessToken}&expiresOn=${tokenResponse.expiresOn}`);
}

export default withSession(handler);
