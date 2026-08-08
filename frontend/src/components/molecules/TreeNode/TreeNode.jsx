import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import FileIcon from "../../atoms/FileIcon/FileIcon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";

export default function TreeNode({ fileFolderData }) {
  const [visibility, setVisibility] = useState({});
  const { editorSocket } = useEditorSocketStore();
  const {
    setX : setFileContextMenuX,
    setY : setFileContextMenuY,
    setIsOpen : setFileContextMenuIsOpen,
    setFile : setFileContextMenuFile
  } = useFileContextMenuStore();

  function toggleVisibility(name) {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [name]: !prevVisibility[name],
    }));
  }

  function computeExtension(fileFolderData) {
    const names = fileFolderData.name.split(".");
    return names[names.length - 1];
  }

  function handleDoubleClick(fileFolderData) {
    editorSocket.emit("readFile", { pathToFileOrFolder: fileFolderData.path });
  }

  function handleContextMenuForFiles(e, path) {
    e.preventDefault();
    setFileContextMenuX(e.clientX);
    setFileContextMenuY(e.clientY);
    setFileContextMenuIsOpen(true);
    setFileContextMenuFile( path );
  }

  return (
    fileFolderData && (
      <div style={{ paddingLeft: "10px", color: "white" }}>
        {fileFolderData.children ? ( //checking if it as a folder
          // if it a folder render button else file
          <button
            onClick={() => {
              toggleVisibility(fileFolderData.name);
            }}
            style={{
              border: "none",
              cursor: "pointer",
              outline: "none",
              backgroundColor: "transparent",
              color: "white",
              paddingTop: "10px",
              fontSize: "18px",
              marginTop: "15px"
            }}
          >
            {visibility[fileFolderData.name] ? (
              <IoIosArrowDown />
            ) : (
              <IoIosArrowForward />
            )}
            {fileFolderData.name}
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FileIcon extension={computeExtension(fileFolderData)} />
            <p
              style={{
                paddingTop: "15px",
                marginTop:"7px",
                fontSize: "18px",
                cursor: "pointer",
                marginLeft: "10px",
                color: "white",
               
              }}
              onContextMenu={(e)=> handleContextMenuForFiles(e, fileFolderData.path)}
              onClick={() => {
                handleDoubleClick(fileFolderData);
              }}
            >
              {fileFolderData.name}
            </p>
          </div>
        )}
        {visibility[fileFolderData.name] &&
          fileFolderData.children &&
          fileFolderData.children.map((child) => (
            <TreeNode key={child.name} fileFolderData={child} />
          ))}
      </div>
    )
  );
}
