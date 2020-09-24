import { NextApiRequest, NextApiResponse } from "next";
import { withInit } from "../../../lib/withInit";
import { DriveItem } from "@microsoft/microsoft-graph-types";
import { withSession } from "../../../lib/withSession";
import { Session } from "next-iron-session";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
};

const handler = async (req: NextApiRequest & { session: Session }, res: NextApiResponse) => {

    const { action } = req.query;

    switch (action) {
        case "save":
            await handleSave(req, res);
            break;
        default:
            res.status(404).end();
    }
};
export default withSession(handler);

async function handleSave(req: NextApiRequest & { session: Session }, res: NextApiResponse): Promise<void> {

    const { content, fileUrl, requestId }: { content: string; fileUrl: string; requestId: string; } = req.body;

    const [token] = await withInit(req as any, res);

    if (typeof content === "undefined" || content.length < 1) {
        return res.status(400).end();
    }

    if (typeof fileUrl === "undefined" || fileUrl.length < 1) {
        return res.status(400).end();
    }

    const itemInfoResponse = await fetch(fileUrl, {
        headers: {
            "authorization": `Bearer ${token}`,
        },
    });
    if (!itemInfoResponse.ok) {
        const errInfo = await itemInfoResponse.clone().text();
        console.error(errInfo);
        return res.status(401).end("Error getting authentication token.");
    }

    const itemInfo: DriveItem = await itemInfoResponse.clone().json();

    const contentUrl = `https://graph.microsoft.com/v1.0/drives/${itemInfo.parentReference.driveId}/items/${itemInfo.id}/content`;

    const updateResult = await fetch(contentUrl, {
        body: Buffer.from(content),
        method: "PUT",
        headers: {
            "authorization": `Bearer ${token}`,
        },
    });

    if (!updateResult.ok) {
        const err = await updateResult.clone().text();
        // TODO:: log errors in telemetry
        console.error(err);
        return res.status(updateResult.status).end(`Update failed. Request Id: ${requestId}`);
    }

    res.status(200).end();
}
