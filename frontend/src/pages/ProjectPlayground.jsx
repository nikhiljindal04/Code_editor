import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditorComponent from "../components/molecules/EditorComponent/EditorComponent";
import EditorButton from "../components/atoms/EditorButton/EditorButton";
import TreeStructure from "../components/organisms/TreeStructure/TreeStructure";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";

export default function ProjectPlayground() {
  const { projectId } = useParams();
  const { setEditorSocket } = useEditorSocketStore();

  useEffect(() => {
    const socketConn = io(`${import.meta.env.VITE_BACKEND_URL}/editor`, {
      query: { projectId: projectId },
    });
    setEditorSocket(socketConn);
  }, [projectId, setEditorSocket]);

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
            <TreeStructure projectId={projectId} />
          </div>
        )}
        <EditorComponent />
      </div>
      <EditorButton />
      <EditorButton isActive={true} />
    </>
  );
}
