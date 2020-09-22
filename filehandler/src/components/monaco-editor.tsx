import React from "react";
import dynamic from "next/dynamic";
import { MonacoEditorProps } from "react-monaco-editor";

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

declare var window: Window & typeof globalThis & { MonacoEnvironment: any };

function editorDidMount(editor, _monaco) {

    window.MonacoEnvironment.getWorkerUrl = (_moduleId: string, label: string) => {

        if (label === "typescript" || label === "javascript") {
            return "/_next/static/ts.worker.js";
        }

        return "/_next/static/editor.worker.js";
    };

    editor.focus();
}

const Editor = (props: Exclude<MonacoEditorProps, "editorDidMount">) => (<MonacoEditor editorDidMount={editorDidMount} {...props} />);
export default Editor;
