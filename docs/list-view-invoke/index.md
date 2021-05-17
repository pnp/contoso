# Contoso Secure Remote Document Generation

One of Contoso's key capabilities is generating documents on demand, directly within SharePoint document libraries. Enabling this scenario involved creating an [SPFx List View Extension](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/building-simple-cmdset-with-dialog-api), [Azure Function Application](https://docs.microsoft.com/en-us/azure/azure-functions/), and [Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/) - along with properly configuring the authentication. All of the steps for setting up the demo solution can be found in the [setup guide](./setup.md).

If interested you can also [read more about the technology](./tech-details.md) behind the solution.

## Application Flow

![](/img/listview-invoke/Contoso-cmd-service-invoke-flow.png)

