import React, { useEffect, useRef } from "react";

export default function MathJaxRender({ children, inline = false }) {
  const ref = useRef();

  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([ref.current]);
    }
  }, [children]);

  if (inline) {
    return <span ref={ref} className="math-inline">{children}</span>;
  }
  return <div ref={ref} className="math-block">{children}</div>;
}
