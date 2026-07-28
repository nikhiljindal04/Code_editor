import fs from "fs/promises";

export const handleEditorSocketEvents = (socket, editorNamespace) => {
  socket.on("writeFile", async ({ pathToFileOrFolder, data }) => {
    try {
      const response = await fs.writeFile(pathToFileOrFolder, data);
      editorNamespace.emit("writeFileSuccess", {
        message: "File written successfully",
        path: pathToFileOrFolder
      });
    } catch (error) {
      console.log("Error writing file");
      socket.emit("error", {
        message: "Error writing file",
      });
    }
  });

  socket.on("createFile", ({ pathToFileOrFolder }) => {
    const isFileAlreadyPresent = fs.stat(pathToFileOrFolder);
    if (isFileAlreadyPresent) {
      socket.emit("error", {
        message: "File already present",
      });
      return;
    }

    try {
      fs.writeFile(pathToFileOrFolder, "");
      socket.emit("createFileSuccess", {
        message: "File created successfully",
      });
    } catch (error) {
      console.log("Error creating file");
      socket.emit("error", {
        message: "Error creating file",
      });
    }
  });

  //readfile
  socket.on("readFile", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.readFile(pathToFileOrFolder, "utf-8");

      socket.emit("readFileSuccess", {
        message: "File read successfully",
        data: response.toString(),
        path: pathToFileOrFolder
      });
    } catch (error) {
      console.log("Error reading file");
      socket.emit("error", {
        message: "Error reading file",
      });
    }
  });

  //deletefile
  socket.on("deleteFile", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.unlink(pathToFileOrFolder);
      socket.emit("deleteFileSuccess", {
        message: "File deleted successfully",
      });
    } catch (error) {
      console.log("Error deleting file");
      socket.emit("error", {
        message: "Error deleting file",
      });
    }
  })

  //createFolder
  socket.on("createFolder", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.mkdir(pathToFileOrFolder);
      socket.emit("createFolderSuccess", {
        message: "Folder created successfully",
      });
    } catch (error) {
      console.log("Error creating folder");
      socket.emit("error", {
        message: "Error creating folder",
      });
    }
  });

  //deleteFolder
  socket.on("deleteFolder", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.rmdir(pathToFileOrFolder, recursive = true);
      socket.emit("deleteFolderSuccess", {
        message: "Folder deleted successfully",
      });
    } catch (error) {
      console.log("Error deleting folder");
      socket.emit("error", {
        message: "Error deleting folder",
      });
    }
  });

  //renameFileOrFolder
  socket.on("renameFileOrFolder", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.rename(pathToFileOrFolder);
      socket.emit("renameFolderSuccess", {
        message: "Folder renamed successfully",
      });
    } catch (error) {
      console.log("Error renaming folder");
      socket.emit("error", {
        message: "Error renaming folder",
      });
    }
  });

};
