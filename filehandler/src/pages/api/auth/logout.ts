import { Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "../../../lib/withSession";

async function handler(req: NextApiRequest & { session: Session }, res: NextApiResponse) {
    req.session.destroy();
    res.redirect("/");
}

export default withSession(handler);
