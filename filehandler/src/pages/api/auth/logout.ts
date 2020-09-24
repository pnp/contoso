import { Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "../../../lib/withSession";
import { sessionKey, SessionState, activateParamsCache } from "../../../lib/withInit";

async function handler(req: NextApiRequest & { session: Session }, res: NextApiResponse) {

    const session: SessionState = req.session.get(sessionKey);
    if (session && session.paramsKey) {
        activateParamsCache.delete(session.paramsKey);
    }

    req.session.destroy();
    res.redirect("/");
}

export default withSession(handler);
