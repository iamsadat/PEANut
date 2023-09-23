// CodeEditorWindow.js
"use client";
import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, code, language, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="flex">
      <div style={{ flex: "1" }}>{/* Content on the left side */}</div>
      <div
        className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl"
        style={{ flex: "1", position: "relative" }}
      >
        <div
          className="resize-handle"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "10px",
            cursor: "ew-resize",
          }}
        />
        <Editor
          height="85vh"
          width={`100%`}
          language={language || "javascript"}
          value={value}
          theme={theme}
          defaultValue="// some comment"
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};
export default CodeEditorWindow;
