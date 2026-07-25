import {
  createProjectService,
  getProjectTreeService,
} from "../services/projectService.js";

export const createProjectController = async (req, res) => {
  const projectId = await createProjectService();

  return res
    .status(200)
    .json({ message: "Project created successfully", data: projectId });
};

export const getProjectTreeController = async (req, res) => {
  const { projectId } = req.params;
  const tree = await getProjectTreeService(projectId);

  return res
    .status(200)
    .json({
      data: tree, 
      success: true,
      message: "Project tree retrieved successfully",
    });
};
