import { Input, Row } from "antd";
import usePortStore from "../../../store/portStore";
import { useEffect, useRef } from "react";
import useFetchPortLogicStore from "../../../store/fetchportLogicStore";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import useTreeStructureStore from "../../../store/treeStructureStore";
import { ReloadOutlined } from "@ant-design/icons";

export const Browser = () => {
    const browserRef = useRef(null);
    const { port } = usePortStore();
    const {isEditorSocketReady, isTerminalSocketReady} = useFetchPortLogicStore();
    const {editorSocket} = useEditorSocketStore();
    const {projectId} = useTreeStructureStore();

    useEffect(() => {
    if (isEditorSocketReady && isTerminalSocketReady && editorSocket) {
      console.log("Both sockets ready, automatically fetching port for", projectId);
      editorSocket.emit("getPort", { containerName: projectId });
    }
  }, [isEditorSocketReady, isTerminalSocketReady, editorSocket, projectId]);

  function handleRefresh(){
    if(browserRef.current){
        const oldAddress = browserRef.current.src;
        browserRef.current.src = oldAddress;
    }  
  }

    return (
        <Row
        style={{
            backgroundColor: "#22212b"
        }}
        >
            <Input
                style={{
                    width : '100%',
                    height: "30px",
                    color: "white",
                    fontFamily: "monospace",
                    backgroundColor: "#282a35",
                    border : '1px solid #444444',
                }}
                prefix={<ReloadOutlined onClick={handleRefresh}/>}
                value={`http://localhost:${port}`}
                readOnly={true}
            />
            <iframe
                ref={browserRef}
                style={{
                    width : '100%',
                    height: "100vh",
                    border: "none"
                }}
                src={`http://localhost:${port}`}
            />

        </Row>
    )
}