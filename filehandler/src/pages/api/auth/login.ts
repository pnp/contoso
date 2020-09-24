import { Session } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { withSession } from "../../../lib/withSession";
import { AuthState, IMSALAuth, paramsSessionKey, authSessionKey, authClientFactory } from "../../../lib/withAuth";
import { fromBase64 } from "../../../lib/utils";

async function handler(req: NextApiRequest & { session: Session }, res: NextApiResponse) {

    const state: AuthState = JSON.parse(fromBase64(req.query.state as string));

    // TODO:: make multi-tenant

    const authApp = await authClientFactory({ domainHint: state.params.domainHint });

    const tokenResponse = await authApp.acquireTokenByCode({
        code: req.query.code as string,
        scopes: ["openid", "Files.ReadWrite"],
        redirectUri: "https://localhost:3000/api/auth/login",
    });

    const authSessionData: IMSALAuth = {
        token: tokenResponse.accessToken,
        expiresOn: tokenResponse.expiresOn,
    };

    req.session.set(authSessionKey, authSessionData);
    req.session.set(paramsSessionKey, state.params);
    await req.session.save();

    // TODO:: this should be taken from the params somehow
    res.redirect(state.target);
}

export default withSession(handler);

// Create msal application object


// export function auth(context: GetServerSidePropsContext<ParsedUrlQuery>): string | never {

//     withIronSession



//     // get token from cookie in request

//     // cookie, great, return it

//     // no cookie, boo, redirect

//     const config = {
//         auth: {
//             clientId: "12d77c73-d09d-406a-ae0d-3d4e576f7d9b",
//             authority: "https://login.microsoftonline.com/90b8faa8-cc95-460e-a618-ee770bee1759",
//             clientSecret: ""
//         },
//         system: {
//             loggerOptions: {
//                 loggerCallback(loglevel, message, containsPii) {
//                     console.log(message);
//                 },
//                 piiLoggingEnabled: false,
//                 logLevel: msal.LogLevel.Verbose,
//             }
//         }
//     };



//     return "";




// }

// export function getApp(): ConfidentialClientApplication {

// }



// const pca = new msal.ConfidentialClientApplication(config);


// // add token to cookit in request

// // redirect to login

// // handle response from login and redirect to previous


// // app.get('/', (req, res) => {
// //     const authCodeUrlParameters = {
// //         scopes: ["user.read"],
// //         redirectUri: "http://localhost:3000/redirect",
// //     };

// //     // get url to sign user in and consent to scopes needed for applicatio
// //     pca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
// //         res.redirect(response);
// //     }).catch((error) => console.log(JSON.stringify(error)));
// // });

// // app.get('/redirect', (req, res) => {
// //     const tokenRequest = {
// //         code: req.query.code,
// //         scopes: ["user.read"],
// //         redirectUri: "http://localhost:3000/redirect",
// //     };

// //     pca.acquireTokenByCode(tokenRequest).then((response) => {
// //         console.log("\nResponse: \n:", response);
// //         res.sendStatus(200);
// //     }).catch((error) => {
// //         console.log(error);
// //         res.status(500).send(error);
// //     });
// // });
