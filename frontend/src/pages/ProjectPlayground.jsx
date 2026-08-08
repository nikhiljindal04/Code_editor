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
import { Browser } from "../components/organisms/Browser/Browser";
import useTerminalSocketStore from "../store/terminalSocketStore";
import useFetchPortLogicStore from "../store/fetchportLogicStore";

export default function ProjectPlayground() {
  const { projectId: projectIdFromURL } = useParams();
  const { setEditorSocket, editorSocket } = useEditorSocketStore();
  const {projectId, setProjectId} = useTreeStructureStore();
  const {setIsEditorSocketReady} = useFetchPortLogicStore();

  useEffect(() => {
    setProjectId(projectIdFromURL);
    const socketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
      query: { projectId: projectId },
    });
    
    socketConn.on("connect", () => {
      setIsEditorSocketReady(true);
    });
    setEditorSocket(socketConn);

    return () => {
      socketConn.disconnect();
      setIsEditorSocketReady(false);
    }
  }, [projectIdFromURL, projectId, setEditorSocket, setProjectId, setIsEditorSocketReady]);

  
  

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
      <div>
        <BrowserTerminal/>
      </div>
      <div>
        {projectId && <Browser/>}
      </div>
    </>
  );
}
