import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditorComponent from "../components/molecules/EditorComponent/EditorComponent";
import EditorButton from "../components/atoms/EditorButton/EditorButton";
import TreeStructure from "../components/organisms/TreeStructure/TreeStructure";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";
import useTreeStructureStore from "../store/treeStructureStore";
import { Terminal } from "@xterm/xterm";
import BrowserTerminal from "../components/molecules/BrowserTerminal/BrowserTerminal";

export default function ProjectPlayground() {
  const { projectId: projectIdFromURL } = useParams();
  const { setEditorSocket, editorSocket } = useEditorSocketStore();
  const {projectId, setProjectId} = useTreeStructureStore();

  useEffect(() => {
    setProjectId(projectIdFromURL);
    const socketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
      query: { projectId: projectId },
    });
    setEditorSocket(socketConn);

    return () => {
      socketConn.disconnect();
    }

  }, [projectIdFromURL, projectId, setEditorSocket, setProjectId]);

  function fetchPort(){

    editorSocket.emit("getPort");
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        {projectId && (
          <div
            style={{
              backgroundColor: "#333254",
              paddingRight: "10px",
              paddingTop: "0.3vh",
              minWidth: "250px",
              maxWidth: "25%",
              height: "99.7vh",
              overflow: "auto",
            }}
          >
            <TreeStructure />
          </div>
        )}
        <EditorComponent />
      </div>
      <EditorButton />
      <EditorButton isActive={true} />
      <button onClick={fetchPort}>Fetch port</button>
      <div>
        <BrowserTerminal/>
      </div>
    </>
  );
}
