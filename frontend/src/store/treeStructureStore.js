import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { getProjectTreeApi } from "../apis/projects";

const useTreeStructureStore = create((set) => {
  //const queryClient = new QueryClient();

  return {
    treeStructure: null,
    // setTreeStructure: async (projectId) => {
    //   const data = await queryClient.fetchQuery({
    //     queryKey: [`projectTree-${projectId}`],
    //     queryFn: () => getProjectTreeApi(projectId),
    //   });
    //   console.log(data);
    //   set({ treeStructure: data });
    // },
    setTreeStructure: async (projectId) => {
      const data = await getProjectTreeApi(projectId);
      console.log(data);
      set({ treeStructure: data });
    },
  };
});

export default useTreeStructureStore;
