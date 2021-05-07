import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';

import * as strings from 'ContosoCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IContosoCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'ContosoCommandSet';

export default class ContosoCommandSet extends BaseListViewCommandSet<IContosoCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized.');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    // const compareOneCommand: Command = this.tryGetCommand("InvokeServiceCommand");
    // if (compareOneCommand) {
    //   // This command should be hidden unless exactly one row is selected.
    //   compareOneCommand.visible = event.selectedRows.length === 1;
    // }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case "InvokeServiceCommand":

        // show properties pane to gather inputs?


        // unblock the main thread
        setTimeout(async () => {

          const client = await this.context.aadHttpClientFactory.getClient("https://listviewinvoke.azurewebsites.net");

          const res = await client.post("https://listviewinvoke.azurewebsites.net/api/ReceiveInvocation", AadHttpClient.configurations.v1, {
            body: JSON.stringify({
              test: "value 1",
              user: this.context.pageContext.user.email,
            }),
          });

          console.log(`:::>> ${this.context.pageContext.aadInfo}`);

          if (!res.ok) {
            const resp = await res.text();
            console.error(Error(`Error [${res.status}: ${res.statusText}]: ${resp}`));
          } else {
            Dialog.alert("API Invoked Successfully");
          }

        }, 0);

        break;

      default:
        throw Error('Unknown command');
    }
  }
}
