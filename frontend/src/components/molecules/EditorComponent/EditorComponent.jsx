import { Editor } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import useActiveFileTabStore from "../../../store/activeFileTabStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

export default function EditorComponent() {
  const [editorState, setEditorState] = useState({});
  const {editorSocket} = useEditorSocketStore();
  const {activeFileTab, setActiveFileTab} = useActiveFileTabStore();

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

  editorSocket?.on("readFileSuccess", (data)=> {
    console.log(data);
    setActiveFileTab(data.path, data.data);
    
  })

  return (
    <>
      {editorState.theme && 
        <Editor
          height="90vh"
          defaultLanguage="javascript"
          //defaultValue="// some comment"
          value={activeFileTab?.value ? activeFileTab.value : "//Somecomment"}
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
