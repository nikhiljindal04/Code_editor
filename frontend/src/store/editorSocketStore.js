import { create } from "zustand";
import useActiveFileTabStore from "./activeFileTabStore";
import useTreeStructureStore from "./treeStructureStore";

export const useEditorSocketStore = create((set) => ({
  editorSocket: null,
  setEditorSocket: (socket) => {
    const activeFileTabSetter = useActiveFileTabStore.getState().setActiveFileTab;
    const projectTreeStructureSetter = useTreeStructureStore.getState().setTreeStructure;

    socket?.on("readFileSuccess", (data) => {
      const fileExtension = data.path.split(".").pop();
      activeFileTabSetter(data.path, data.data, fileExtension);
    });

    socket?.on("writeFileSuccess", (data) => {
      const activeFileTab = useActiveFileTabStore.getState().activeFileTab;
      console.log("inside writeFileSuccess", activeFileTab, data);

      if (activeFileTab?.path && activeFileTab.path === data.path) {
        console.log("emit read File")
        socket.emit("readFile", { pathToFileOrFolder: activeFileTab.path });
      }
    });

    socket?.on("deleteFileSuccess", () => {
      projectTreeStructureSetter();
    });

    set({ editorSocket: socket });
  },
}));
