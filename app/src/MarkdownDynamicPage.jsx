import React from "react";
import { useParams } from "react-router-dom";
import MarkdownPage from "./MarkdownPage";

export default function MarkdownDynamicPage() {
  const { mdfile } = useParams();
  return <MarkdownPage src={`/content/${mdfile}.md`} />;
}
