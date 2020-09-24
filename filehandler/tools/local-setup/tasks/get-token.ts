import { log, enter, leave } from "../logger";
// import { createInterface } from "readline";
import { PublicClientApplication } from "@azure/msal-node";

const GetToken = async (): Promise<{ appId: string, tenantId: string, token: string }> => {

    enter("GetToken");

    log("Beginning device-code flow.");

    // const readline = createInterface({
    //     input: process.stdin,
    //     output: process.stdout,
    // });

    // const appId = await new Promise<string>(resolve => {
    //     readline.question("What is the client id for the setup application? ", id => {
    //         resolve(id);
    //     });
    // });

    // const tenantId = await new Promise<string>(resolve => {
    //     readline.question("What is the tenant id for the setup application? ", id => {
    //         resolve(id);
    //     });
    // });

    // TODO: remove these from testing
    const tenantId = "ef379d32-30d7-46fd-9bc8-971e0cfff9bd";

    const appId = "0560b025-e23a-4d7d-9862-45105defab5b";

    log(`Using appId: ${appId} in tenant id: ${tenantId}`);

    let token = "";

    // tslint:disable-next-line: max-line-length
    // token = "eyJ0eXAiOiJKV1QiLCJub25jZSI6InhveDE2NWUyMXM0akxNLURueUZUVE9xN0RIeC1xZGdQYkZEaEc0RG9tc00iLCJhbGciOiJSUzI1NiIsIng1dCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9lZjM3OWQzMi0zMGQ3LTQ2ZmQtOWJjOC05NzFlMGNmZmY5YmQvIiwiaWF0IjoxNjAwODA2MjgyLCJuYmYiOjE2MDA4MDYyODIsImV4cCI6MTYwMDgxMDE4MiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFVUUF1LzhRQUFBQUtFTWZ1cm1hckluM2FKU0s0RkNmMy94aXJ5MTN0U1ptbzE2UkwvckFjbG1LZWRRdkhUaU15MUhXeHdPdncvRFNTTHI5bjl6SmFvYUlYZkRibFZubitRPT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6ImZpbGVoYW5kbGVyIGxvY2FsZGV2IHNldHVwIiwiYXBwaWQiOiIwNTYwYjAyNS1lMjNhLTRkN2QtOTg2Mi00NTEwNWRlZmFiNWIiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IlJvZGdlcnMiLCJnaXZlbl9uYW1lIjoiUGF0cmljayIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjczLjE0OC40My43OCIsIm5hbWUiOiJQYXRyaWNrIiwib2lkIjoiMWQ3Zjg3NmEtNDljMi00YjA1LThjYTQtY2I4MTlhZTg0MGM0IiwicGxhdGYiOiIxNCIsInB1aWQiOiIxMDAzN0ZGRTgyQzNFMkUxIiwicmgiOiIwLkFBQUFNcDAzNzljd19VYWJ5SmNlRFBfNXZTV3dZQVU2NG4xTm1HSkZFRjN2cTF0YkFFQS4iLCJzY3AiOiJEaXJlY3RvcnkuQWNjZXNzQXNVc2VyLkFsbCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJScjVwaHZYaXRRcWtTcHAtd21lbU9pRllVc0FDSTg3WXVvbXExXzhZYkNNIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik5BIiwidGlkIjoiZWYzNzlkMzItMzBkNy00NmZkLTliYzgtOTcxZTBjZmZmOWJkIiwidW5pcXVlX25hbWUiOiJwYXRyaWNrQHRocmVlMThzdHVkaW9zLmNvbSIsInVwbiI6InBhdHJpY2tAdGhyZWUxOHN0dWRpb3MuY29tIiwidXRpIjoiNnlDQVhXWUtTRVNsUlBRRENOTkZBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJQSG1XWnJoSU0ybXZuRk9jaFhPQmVtTFVCdzFzRDhWMlU0ZUluNm9SVmNBIn0sInhtc190Y2R0IjoxMzQ5MjczMjkyfQ.0cALsAriDRI8mTj-mSIOjt8adrvk0qaaRvc1Ah6BjE1-QF3aVbQoViqv2NSDU0kJK0lDB1ijhphty9XSZEYxtb0JaMD8Br7q9RduOOxdB2CbpVPYIA06FT6e040YeB0gc7BkrzncqAx5FhS6Pu9Lq6GXdCzue1EBp8BC65sdPF5b6BcbHzpXsRTxTB6qK4wuWTg5ToJFdx6yxDmvrdb0KkkPim4_l4C7nLkBltoMpfr1dHPqiYm6dc-NzIcgARuOi8a_7oqSNX6-WuMqVet3U_PD9BnmbEMiTzc0QlMDrQSgtmxJ-Enso24RLakTx0YpvgQDR1Yi75NIipDaGx37Pw";

    log("Requesting token");

    if (token === "") {

        // authenticate
        const pca = new PublicClientApplication({
            auth: {
                authority: `https://login.microsoftonline.com/${tenantId}`,
                clientId: appId,
            },
        });

        const tokenResponse = await pca.acquireTokenByDeviceCode({
            deviceCodeCallback: (response) => (console.log(response.message)),
            scopes: ["Directory.AccessAsUser.All"],
        });

        token = tokenResponse.accessToken;
    }

    log("Token acquired");

    leave("GetToken");

    return { appId, tenantId, token };
};

export default GetToken;
