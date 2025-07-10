
import React, { useEffect, useState, useRef } from "react";
import Markdown from "markdown-to-jsx";
import hljs from "./hljs";

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
      .then(text => {
        // Normalize line endings and trim trailing whitespace
        setContent(text.replace(/\r\n/g, "\n").replace(/[ \t]+$/gm, ""));
      })
      .catch(e => setError(e.message));
  }, [src]);

  useEffect(() => {
    if (ref.current) {
      // Highlight code blocks
      ref.current.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    }
    // Re-typeset math
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [content]);

  if (error) {
    return <div className="markdown-body"><p style={{color: 'red'}}>Error: {error}</p></div>;
  }

  return (
    <div className="markdown-body" ref={ref}>
      <Markdown
        options={{
          forceBlock: true,
          disableParsingRawHTML: false,
          overrides: {
            // Standardize image rendering for markdown images
            img: {
              props: {
                style: { maxWidth: '100%', height: 'auto', display: 'block', margin: '1em auto' }
              }
            },
            // Standardize table rendering
            table: {
              props: {
                className: 'md-table',
                style: { margin: '1em auto', borderCollapse: 'collapse', width: '100%' }
              }
            },
            th: {
              props: {
                style: { border: '1px solid #ccc', padding: '0.5em', background: '#f8f8f8' }
              }
            },
            td: {
              props: {
                style: { border: '1px solid #ccc', padding: '0.5em' }
              }
            },
          }
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}