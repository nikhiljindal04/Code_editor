import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { getProjectTreeApi } from "../apis/projects";

const useTreeStructureStore = create((set, get) => ({
  projectId: null,
  treeStructure: null,
  setTreeStructure: async () => {
    console.log("inside setTreeStructure", get().projectId);
    const data = await getProjectTreeApi(get().projectId);
    set({ treeStructure: data });
  },
  setProjectId: (projectId) => {
    set({ projectId: projectId });
  }
}));

export default useTreeStructureStore;
