import React, {useMemo} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {darcula} from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function ChatContent({content}: { content: string}) {
  const processedContent = useMemo(() => content?.replace(/\n/g, '  \n'), [content]);
  
  return (
    <ReactMarkdown
        className="markdown"
        remarkPlugins={[remarkGfm]}
        components={{
          code({className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
                <SyntaxHighlighter
                    codeTagProps={props}
                    language={match[1]}
                    PreTag="pre"
                    style={darcula}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                  {children}
                </code>
            );
          }
        }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
