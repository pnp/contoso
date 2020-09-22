import { EnsureDir, GetToken, EnsureApp, InjectManifest, WriteLocalSettings, WriteLocalSSLCerts } from "./tasks";
import { log, reset } from "./logger";

/**
 * This script will perform the following setup actions for you to assist with local development. It
 * can also serve as a starting point to write production setup scripts customized for your needs.
 * 
 * - ensure directory dev-secrets exists
 * 
 * - create file handler registration application with Directory.ReadWrite.All -> record id in app-config.json
 *   - consent app
 * 
 * - create file handler application with Files.ReadWrite.All, openid, profile, User.Read -> record id in app-config.json
 *   - consent app
 *   - add a secret -> app-config.json
 * 
 * 
 * 
 */

export default async function Setup(workingDir = process.env.INIT_CWD) {

    reset();
    log("Starting local development setup process...");
    log(`Working directory: ${workingDir}`);

    // we ensure the ".local-dev-secrets" directory exists
    const secretsDir = EnsureDir(workingDir);

    // we need to establish appId, tenantId, token
    const { token } = await GetToken();

    // we need to create an application (or get the values from the existing one)
    const { appId, appSecret, created, id } = await EnsureApp(token);

    if (created) {

        // we need to inject the manifest into the new app
        await InjectManifest(token, id);

        // write the local settings file that will be used by the webserver to auth
        WriteLocalSettings(secretsDir, appId, appSecret);
    }

    // we need to create the ssl files in the .local-dev-secrets folder
    WriteLocalSSLCerts(secretsDir);
}
