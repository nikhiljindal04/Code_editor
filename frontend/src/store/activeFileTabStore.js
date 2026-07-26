import { create } from "zustand";
//it will be used to get and set the active file where value = name of the file

const useActiveFileTabStore = create((set) => {
  return {
    activeFileTab: null,
    setActiveFileTab: (path, value, extension) => {
      set({
        activeFileTab: { path: path, value: value, extension: extension }
      });
    }
  };
});

export default useActiveFileTabStore;
