import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "../../../hooks/useAppToken";
import { DriveItem } from "@microsoft/microsoft-graph-types";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { action } = req.query;

    switch (action) {
        case "save":
            await handleSave(req, res);
            break;
        default:
            res.status(404).end();
    }
};

async function handleSave(req: NextApiRequest, res: NextApiResponse): Promise<void> {

    const { appId, content, fileUrl, requestId }: { appId: string; content: string; fileUrl: string; requestId: string; } = req.body;
    const [applyToken] = await getToken(appId);

    if (typeof content === "undefined" || content.length < 1) {
        res.status(400);
        return;
    }

    if (typeof fileUrl === "undefined" || fileUrl.length < 1) {
        res.status(400);
        return;
    }

    const itemInfoResponse = await fetch(fileUrl, applyToken());
    if (!itemInfoResponse.ok) {
        const errInfo = await itemInfoResponse.clone().text();
        console.error(errInfo);
        res.status(401).end("Error getting authentication token.");
        return;
    }

    const itemInfo: DriveItem = await itemInfoResponse.clone().json();

    const contentUrl = `https://graph.microsoft.com/v1.0/drives/${itemInfo.parentReference.driveId}/items/${itemInfo.id}/content`;

    const updateResult = await fetch(contentUrl, {
        body: Buffer.from(content),
        method: "PUT",
        ...applyToken(),
    });

    if (!updateResult.ok) {
        const err = await updateResult.clone().text();
        console.error(err);
        res.status(updateResult.status).end(`Update failed. Request Id: ${requestId}`);
        return;
    }

    res.status(200).end();
}
