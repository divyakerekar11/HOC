import React, { useCallback } from "react";
import ReactQuill from "react-quill";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import "quill-mention";
import { formats, modules } from "./config";
import type { EditorProps } from "./types";

// Import and register the mention module
import QuillMention from "quill-mention";
Quill.register("modules/mention", QuillMention);

export function Editor({
  initialValue = "Start typing here...",
  onChange,
}: EditorProps) {
  const handleChange = useCallback(
    (content: string) => {
      onChange?.(content);
    },
    [onChange]
  );

  return (
    <div className="border rounded-lg">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={initialValue}
        onChange={handleChange}
        className="h-[400px] mb-12"
      />
    </div>
  );
}
