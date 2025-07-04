import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";
import hljs from "./hljs";

// Custom component for <details> and <summary> to support dropdowns in markdown
function Details(props) {
  return <details {...props} className="details">{props.children}</details>;
}
function Summary(props) {
  return <summary {...props} className="summary">{props.children}</summary>;
}

export default function MarkdownPage({ src }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const ref = useRef();

  useEffect(() => {
    setError(null);
    fetch(src)
      .then(res => {
        if (!res.ok) throw new Error("Markdown file not found");
        return res.text();
      })
      .then(setContent)
      .catch(e => setError(e.message));
  }, [src]);

  useEffect(() => {
    if (ref.current) {
      ref.current.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    }
  }, [content]);

  if (error) {
    return <div className="markdown-body"><p style={{color: 'red'}}>Error: {error}</p></div>;
  }

  return (
    <div className="markdown-body" ref={ref}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeMathjax]}
        components={{
          details: Details,
          summary: Summary,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}