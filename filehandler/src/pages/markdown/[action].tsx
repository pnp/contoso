import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import dynamic from "next/dynamic";

import useDebounce from "../../hooks/useDebounce";

import Layout from "../../components/layout";
import MonacoEditor from "../../components/monaco-editor";
import MarkdownPreview from "../../components/markdown-preview";

import { IActivationProps } from "../../lib/types";

import { IStackTokens, Stack as StackTyper } from "office-ui-fabric-react/lib/Stack";
import { withSession } from "../../lib/withSession";

import { readRequestBody } from "../../lib/utils";
import { withAuth } from "../../lib/withAuth";

// these are needed to cheat the typings for dynamic imports
import { PrimaryButton as PrimaryButtonTyper, DefaultButton as DefaultButtonTyper } from "office-ui-fabric-react/lib-commonjs/Button";

const PrimaryButton = dynamic(import("office-ui-fabric-react/lib-commonjs/Button").then(r => r.PrimaryButton) as Promise<typeof PrimaryButtonTyper>, { ssr: false });
const DefaultButton = dynamic(import("office-ui-fabric-react/lib-commonjs/Button").then(r => r.DefaultButton) as Promise<typeof DefaultButtonTyper>, { ssr: false });
const Stack = dynamic(import("office-ui-fabric-react/lib-commonjs/Stack").then(r => r.Stack) as Promise<typeof StackTyper>, { ssr: false });

const stackTokens: IStackTokens = { childrenGap: 40 };

const getServerSidePropsHandler: GetServerSideProps = async ({ req, res }) => {

  let activationParams: Partial<IActivationProps> = {};

  const buffer = await readRequestBody(req);

  activationParams = buffer.split("&").map(v => v.split("=")).reduce((prev: Partial<IActivationProps>, curr: any[]) => {
    prev[curr[0]] = curr[0] === "items" ? JSON.parse(decodeURIComponent(curr[1])) : curr[1];
    return prev;
  }, {});

  const token = await withAuth(req as any, res, activationParams as any);

  // read the file from the url supplied via the activation params
  // we do this on the server due to cors and redirect issues when trying to do it on the client
  const response = await fetch(`${activationParams.items[0]}/content`, {
    headers: {
      "authorization": `Bearer ${token}`
    },
  });

  // set the content for the client
  activationParams.content = await response.text();

  return {
    props: {
      activationParams,
    },
  };
};
export const getServerSideProps = withSession(getServerSidePropsHandler);

/*

<li><a href="#" onclick="renameFile()">Rename</a></li>

<li><a href="#" onclick="shareLinkToFile()">Get link</a></li>

*/


const Handler = (props: { activationParams: IActivationProps }) => {

  const [content, setContent] = useState<string>(props.activationParams.content);

  const [dirty, setDirty] = useState(false);

  // determine what action is being invoked (create/edit/preview)
  const { action } = useRouter().query;

  // handle content changes
  function contentChange(value: string) {
    // update our content state
    setContent(value);

    // update our dirty flag
    if (!dirty) {
      setDirty(true);
    }
  }

  // handle close
  function close() {
    if (dirty && !confirm("You have unsaved changes, are you sure you want to close?")) {
      return;
    }
    window.close();
  }

  // handle save
  function save(andClose: boolean): any {

    return async () => {

      const response = await fetch("/api/filehandler/save", {
        body: JSON.stringify({
          appId: props.activationParams.appId,
          content: content,
          fileUrl: props.activationParams.items[0],
          requestId: "123",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        setDirty(false);
      }

      if (andClose) {
        close();
      }
    };
  }

  if (action === "preview") {

    return (
      <Layout>
        <Head>
          <title>{action} Markdown File</title>
        </Head>

        <article>
          <h1 className="ms-fontWeight-bold ms-fontSize-28">Preview</h1>

          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm12">
                <div className="ms-depth-8">
                  <MarkdownPreview markdown={content} />
                </div>
              </div>
            </div>
          </div>
        </article>
      </Layout >
    );
  } else {

    // help reduce costly re-renders of the preview content
    const debouncedContent = useDebounce(content);

    return (
      <Layout>
        <Head>
          <title>{action} Markdown File</title>
        </Head>

        <article>
          <h1 className="ms-fontWeight-bold ms-fontSize-28">{action} Markdown</h1>

          <Stack horizontal tokens={stackTokens}>
            <DefaultButton text="Close" allowDisabledFocus onClick={close} />
            <PrimaryButton text="Save" allowDisabledFocus menuProps={{
              items: [
                {
                  iconProps: { iconName: "Mail" },
                  key: "save",
                  onClick: save(false),
                  text: "Save",
                },
                {
                  iconProps: { iconName: "Mail" },
                  key: "saveandclose",
                  onClick: save(true),
                  text: "Save & Close",
                },
              ],
            }} />
          </Stack>

          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
              <div className="ms-Grid-col ms-sm6">
                <MonacoEditor
                  defaultValue={content}
                  onChange={contentChange}
                  width="100%"
                  height="600px"
                  language="markdown"
                  options={{
                    selectOnLineNumbers: true,
                  }}
                  theme="vs" />
              </div>
              <div className="ms-Grid-col ms-sm6">
                <div className="ms-depth-8">
                  <MarkdownPreview markdown={debouncedContent} />
                </div>
              </div>
            </div>
          </div>
        </article>
      </Layout >
    );
  }
};
export default Handler;
