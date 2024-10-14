"use client";

import useMinimalTiptapEditor from "@/components/minimal-tiptap/hooks/use-minimal-tiptap";
import { EditorContent } from "@tiptap/react";
import React from "react";

export default function DisplayContent({ content }: { content: string }) {
  const editor = useMinimalTiptapEditor({
    value: content,
  });

  if (!editor) {
    return null;
  }
  return (
    <div>
      <EditorContent disabled editor={editor} />
    </div>
  );
}
