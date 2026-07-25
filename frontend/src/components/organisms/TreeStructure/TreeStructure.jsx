import React, { useEffect } from "react";
import useTreeStructureStore from "../../../store/treeStructureStore";
import TreeNode from "../../molecules/TreeNode/TreeNode";

export default function TreeStructure({projectId}) {
  const { treeStructure, setTreeStructure } = useTreeStructureStore();

  useEffect(() => {
    if (treeStructure) {
      console.log("tree", treeStructure);
    } else {
      setTreeStructure(projectId);
    }
  }, [projectId, setTreeStructure, treeStructure]);

  return (
    <div> 
        <TreeNode fileFolderData={treeStructure}/>
    </div>
  );
}
