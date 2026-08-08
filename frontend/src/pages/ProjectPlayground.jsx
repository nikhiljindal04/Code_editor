import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditorComponent from "../components/molecules/EditorComponent/EditorComponent";
import TreeStructure from "../components/organisms/TreeStructure/TreeStructure";
import { useEditorSocketStore } from "../store/editorSocketStore";
import { io } from "socket.io-client";
import useTreeStructureStore from "../store/treeStructureStore";
import BrowserTerminal from "../components/molecules/BrowserTerminal/BrowserTerminal";
import { Browser } from "../components/organisms/Browser/Browser";
import useFetchPortLogicStore from "../store/fetchportLogicStore";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { Divider } from "antd";

export default function ProjectPlayground() {
  const { projectId: projectIdFromURL } = useParams();
  const { setEditorSocket } = useEditorSocketStore();
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
              height: "100vh",
              overflow: "auto",
            }}
          >
            <TreeStructure />
          </div>
        )}
        <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
        >
          <Allotment>
            <div
            //set basic styling for vertical split
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              backgroundColor:"#282a35",
            }}
            >
              <Allotment
                vertical={true}
                >
                <div>
                  <EditorComponent />
                </div>

                <div style={{
                  borderTop: "1px solid #3a3a3a",
                }}>
                  <BrowserTerminal/>
                </div>
              </Allotment>
            </div>
            <div>
              {projectId && <Browser/>}
            </div>
          </Allotment>
        </div>
      </div>
      {/* <EditorButton />
      <EditorButton isActive={true} /> */}
      
      
    </>
  );
}
