# List View Invoke Tech Details

This solution was built using SharePoint Framework (SPFx), Azure Functions, and Azure Service Bus choices discussed below. We used [TypeScript](https://www.typescriptlang.org/) to build all of the pieces of our solution, however the function piece could just as easily been written in any language available to run on Azure Functions. SPFx, as a client-side technology, requires the use of TypeScript or JavaScript.

Additionally, there is a list of [reference links](#reference-links) we found useful while building our solution.

## SharePoint Framework

[SharePoint Framework](https://aka.ms/spfx) (SPFx) is the way to add UI features including client-side code in SharePoint Online. We used a [List View Command Set extension](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/building-simple-cmdset-with-dialog-api) to include our button directly into the UI for Libraries. This allows us to know to where we will write the generated document, along with who initiated the request. This is done using the [built in capabilities](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aadhttpclient) of SPFx to call AAD secured APIs.

## Azure Functions

[Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/) are a cost effective, secure way to deploy solutions to Azure. While not appropriate for all applications the capabilities of functions met our needs. This solution could work similiarly using a full web app, VM, or other hosting while the flow remains the same. The key advantage of Azure Functions for us was the simple setup of authentication to ensure our solution is secure.

We used two functions, one to receive and queue the request and a second to do the work, to illustrate one way to help handle scale by ensuring a quick response back to the user, while providing time to complete the operations.

## Azure Service Bus

The [Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/) allows us to create a buffer between requests (fast, many) and document generation (slower). This is a lightweight way to scale an application and met our needs - we also considered [Azure SQL](https://azure.microsoft.com/en-us/products/azure-sql/), but simple messaging worked in this case.

One consideration is that we are storing the user's bearer token within the queue message. OK for a sample, but handling of token in production should adhear to the [best available guidance](https://docs.microsoft.com/en-us/azure/architecture/example-scenario/secrets/secure-refresh-tokens).

## Reference Links

We found the following list of links helpful while developing our solution:

### SPFx app

- [Build your first ListView Command Set extension](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/building-simple-cmdset-with-dialog-api)
- [Connect to Azure AD-secured APIs in SharePoint Framework solutions](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aadhttpclient)

### Azure Functions

- [Overview](https://docs.microsoft.com/en-us/azure/azure-functions/)
- [Tools](https://github.com/Azure/azure-functions-core-tools)
- [Http Triggered Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook)
- [Create a function app for serverless code execution](https://docs.microsoft.com/en-us/azure/azure-functions/scripts/functions-cli-create-serverless)
- [Securing Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/security-concepts)
- [Token Store](https://docs.microsoft.com/en-us/azure/app-service/overview-authentication-authorization#token-store)
- [Configure how end-users consent to applications](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/configure-user-consent?tabs=azure-portal)
- [Configure your App Service or Azure Functions app to use Azure AD login](https://docs.microsoft.com/en-us/azure/app-service/configure-authentication-provider-aad)
- [Azure Functions JavaScript developer guide](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=v2)
- [Call API securely from browser code](https://docs.microsoft.com/en-us/azure/app-service/tutorial-auth-aad?pivots=platform-linux#call-api-securely-from-browser-code)
- [Microsoft identity platform and OAuth 2.0 On-Behalf-Of flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow)

### Service Bus

- [Overview](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-quickstart-portal)
- [Send messages to and receive messages from Azure Service Bus queues (JavaScript)](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-nodejs-how-to-use-queues)
