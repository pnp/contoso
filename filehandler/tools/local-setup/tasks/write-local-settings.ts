import { log, enter, leave } from "../logger";
import { writeFileSync } from "fs";
import {resolve } from "path";

const WriteLocalSettings = async (path: string, appId: string, appSecret: string) => {

    enter("InjectManifest");

    log(`Writing settings file.`);

    const file = [];
    file.push(`export const appId = "${appId}";`);
    file.push(`export const appSecret = "${appSecret}";`);

    writeFileSync(resolve(path, "settings.ts"), file.join("\n") + "\n");

    log(`Wrote settings file.`);

    leave("InjectManifest");
};

export default WriteLocalSettings;
