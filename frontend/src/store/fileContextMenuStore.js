import { create } from "zustand";

export const useFileContextMenuStore = create((set)=>({
    x:null,
    y:null,
    isOpen:false,
    file:null,
    setX : (x)=>{
        set({x:x})
    },
    setY : (y)=>{
        set({y:y})
    },
    setIsOpen : (isOpen)=>{
        set({isOpen:isOpen})
    },
    setFile : (file)=>{
        set({file:file})
    }

    
}))