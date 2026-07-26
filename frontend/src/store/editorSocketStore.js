import { create } from "zustand";

export const useEditorSocketStore = create((set) => ({
  editorSocket: null,
  setEditorSocket: (socket) => set({ editorSocket: socket }),
}));
