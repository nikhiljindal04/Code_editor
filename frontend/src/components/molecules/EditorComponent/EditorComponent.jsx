import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import useActiveFileTabStore from "../../../store/activeFileTabStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { extensionToFileType } from "../../../utils/extensionToFileType";

export default function EditorComponent() {
  const [editorState, setEditorState] = useState({});
  const { activeFileTab } = useActiveFileTabStore();

  const { editorSocket } = useEditorSocketStore();
  const timerRef = useRef(null);

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

  function handleChange(value) {
    //implement debouncing
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      const editorContent = value;
      console.log("hii event fired")
      editorSocket.emit("writeFile", {
        pathToFileOrFolder: activeFileTab.path,
        data: editorContent,
      });
    }, 2000);
  }

  return (
    <>
      {editorState.theme && (
        <Editor
          height="90vh"
          language={extensionToFileType(activeFileTab?.extension) || "plaintext"}
          value={activeFileTab?.value ? activeFileTab.value : "//Somecomment"}
          options={{
            fontSize: 18,
            fontFamily: "monospace",
          }}
          onChange={handleChange}
          onMount={handleEditorTheme}
        />
      )
      }
    </>
  );
}
