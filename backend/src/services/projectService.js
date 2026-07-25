import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import { execPromisified } from "../utils/execUtility.js";
import path from "path";
import directoryTree from "directory-tree";
import { REACT_PROJECT_COMMAND } from "../config/serverConfig.js";

export const createProjectService = async () => {
    const projectId = uuidv4();

  fs.mkdir(`./projects/${projectId}`);
  const response = await execPromisified(
    REACT_PROJECT_COMMAND,
    {cwd: `./projects/${projectId}`},
  );
    return projectId;
}

export const getProjectTreeService = async (projectId) => {
    const projectPath = path.resolve(`./projects/${projectId}`);
    const tree = await directoryTree(projectPath);
    //console.log(tree);
    return tree;
}