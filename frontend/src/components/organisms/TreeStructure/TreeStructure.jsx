import React, { useEffect } from "react";
import useTreeStructureStore from "../../../store/treeStructureStore";
import TreeNode from "../../molecules/TreeNode/TreeNode";
import { useFileContextMenuStore } from "../../../store/fileContextMenuStore";
import FileContextmenu from "../../molecules/ContextMenu/FileContextmenu";

export default function TreeStructure() {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();
  const {
    x: fileContextX,
    y: fileCordinateY,
    isOpen,
    file
  } = useFileContextMenuStore();

  useEffect(() => {
    if (treeStructure) {
      null;
    } else {
      setTreeStructure();
    }
  }, [ setTreeStructure, treeStructure]);

  return (
    <>
    {
      isOpen && file && (
        <FileContextmenu x={fileContextX} y={fileCordinateY} path={file}/>
      )
    }
      <TreeNode fileFolderData={treeStructure} />
    </>
  );
}
