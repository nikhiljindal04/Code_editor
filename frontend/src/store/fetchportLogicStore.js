import { create } from "zustand";

const useFetchPortLogicStore = create((set) => {
  return {
    isEditorSocketReady : false,
    isTerminalSocketReady : false,
    setIsEditorSocketReady : (value) => {
        set({
            isEditorSocketReady : value
        })
    },
    setIsTerminalSocketReady : (value) => {
        set({
            isTerminalSocketReady : value
        })
    },
  }
});

export default useFetchPortLogicStore;