import { create } from "zustand";
import { useEditorSocketStore } from "./editorSocketStore";
import useTreeStructureStore from "./treeStructureStore";
//it will be used to get and set the active file where value = name of the file

const useTerminalSocketStore = create((set) => {
  return {
    terminalSocket: null,
    setTerminalSocket: (socket) => {
      set({
        terminalSocket: socket
      });    }
  };
});

export default useTerminalSocketStore;
