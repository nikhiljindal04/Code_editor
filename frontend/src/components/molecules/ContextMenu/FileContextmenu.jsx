import React from "react";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import "./FileContextMenu.css";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

export default function FileContextmenu({ x, y, path }) {

    const {setIsOpen} = useFileContextMenuStore();
    const { editorSocket } = useEditorSocketStore();
    console.log("path 1", );

    function handleFileDelete() {
        console.log("path 2", path);
        editorSocket.emit("deleteFile", { pathToFileOrFolder: path });
        setIsOpen(false);
    }

  return <div
  onMouseLeave={()=>{
    setIsOpen(false);
  }}
  style={{
    width:"120px",
    position:"fixed",
    left:x,
    top:y ,
    border:"2px solid black"
  }}
  >
    <button className="fileContextButton"
    onClick={handleFileDelete}
    >
        Delete file
    </button>
    <button className="fileContextButton"
    onClick={()=>{handleFileRename}}
    >
        Rename file
    </button>
  </div>;
}
