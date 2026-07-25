import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";

export default function EditorComponent() {
  const [editorState, setEditorState] = useState({});
  

  useEffect(() => {
    async function downloadTheme() {
    const response = await fetch("/dracula.json");
    const data = await response.json();
    setEditorState({ ...setEditorState, theme: data });
  }
    downloadTheme();

  }, []);

  function handleEditorTheme(editor, monaco) {
    monaco.editor.defineTheme("dracula", editorState.theme);
    monaco.editor.setTheme("dracula");
  }

  return (
    <>
      {editorState.theme && 
        <Editor
          height="90vh"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          options={{
            fontSize: 18,
            fontFamily: "monospace"
          }}
          onMount={handleEditorTheme}
        />
      }
    </>
  );
}
