import React, { useEffect, useState } from "react";
import { parse } from "marked";
import { sanitize } from "dompurify";

export interface IMarkdownPreviewProps {
    markdown: string;
}

const MarkdownPreview = (props: IMarkdownPreviewProps) => {

    const { markdown } = props;
    const [parsed, setParsed] = useState<string>("Processing...");

    useEffect(() => {

        (async () => {

            const updated = await new Promise<string>(resolve => {

                parse(markdown, (err, result) => {
                    if (err) {
                        result = err?.message;
                    }

                    resolve(sanitize(result));
                });
            });

            setParsed(updated);
        })();
    }, [markdown]);

    return (<iframe src={`data:text/html;charset=utf-8,${parsed}`} />);
};
export default MarkdownPreview;
