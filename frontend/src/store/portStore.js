import { create } from "zustand";
//it will be used to get and set the active file where value = name of the file

const usePortStore = create((set) => {
  return {
    port: null,
    setPort: (port) => {
      set({
        port: port
      });
    }
  };
});

export default usePortStore;
