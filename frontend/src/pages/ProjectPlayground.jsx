import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditorComponent from "../components/molecules/EditorComponent/EditorComponent";
import EditorButton from "../components/atoms/EditorButton/EditorButton";
import TreeStructure from "../components/organisms/TreeStructure/TreeStructure";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";
import useTreeStructureStore from "../store/treeStructureStore";

export default function ProjectPlayground() {
  const { projectId: projectIdFromURL } = useParams();
  const { setEditorSocket } = useEditorSocketStore();
  const {projectId, setProjectId} = useTreeStructureStore();

  useEffect(() => {
    setProjectId(projectIdFromURL);
    const socketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
      query: { projectId: projectId },
    });
    console.log("project component reloaded")
    setEditorSocket(socketConn);
  }, [projectIdFromURL, projectId, setEditorSocket, setProjectId]);

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
    </>
  );
}
