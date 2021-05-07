import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ServiceBusClient } from "@azure/service-bus";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    // const name = (req.query.name || (req.body && req.body.name));

    const client = new ServiceBusClient("Endpoint=sb://contosolistview.servicebus.windows.net/;SharedAccessKeyName=clientpolicy;SharedAccessKey=k3T8ZUnPdNK0wLjJYhK05IUmhcpIqHyyGNv/leWBikU=");

    const sender = client.createSender("ops");

    try {


        // TODO:: get user values

        await sender.sendMessages({
            body: "here",
        });

        context.res = {
            status: 200,
            body: "Operation successfully added to queue"
        };

    } catch (e) {

        console.error("We caught it!");
        console.error(e);

        context.res = {
            status: 500,
            body: `There was an error adding the message to the queue: ${e.message ? e.message : e}`,
        };

    } finally {

        await sender.close();
        await client.close();
    }
};

export default httpTrigger;