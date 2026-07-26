import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import FileIcon from "../../atoms/FileIcon/FileIcon";
import { useEditorSocketStore } from "../../../store/editorSocketStore";

export default function TreeNode({ fileFolderData }) {
  const [visibility, setVisibility] = useState({});
  const { editorSocket } = useEditorSocketStore();

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
              paddingTop: "15px",
              fontSize: "14px",
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
                paddingTop: "5px",
                fontSize: "15px",
                cursor: "pointer",
                marginLeft: "5px",
                color: "white",
                userSelect: "none",
              }}
              onDoubleClick={() => {
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
