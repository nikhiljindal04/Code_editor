import express from "express";
import { PORT } from "./config/serverConfig.js";
import cors from "cors";
import apiRouter from "./routes/index.js";
import { createServer } from "http";
import { Server } from "socket.io";
import chokidar from "chokidar";
import path from "path";
import { handleEditorSocketEvents } from "./socketHandlers/editorEventHandler.js";
import { handleContainerCreate, listContainers } from "./Containers/handleContainerCreate.js";
import { WebSocketServer } from "ws";
import { handleTerminalCreation } from "./Containers/handleTerminalCreation.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/api", apiRouter);

const editorNamespace = io.of("/editor");

editorNamespace.on("connection", (socket) => {
  console.log("a user connected");
  let projectId = socket.handshake.query.projectId;

  // if (projectId) {
  //   let lastTouched = new Map();
  //   var watcher = chokidar.watch(`./projects/${projectId}`, {
  //     ignored: (path) => path.includes("node_modules"),
  //     persistent: true, //watcher will run till app is running
  //     awaitWriteFinish: {
  //       stabilityThreshold: 50,
  //     },
  //     ignoreInitial: true, //ignore the initial add events
  //   });
  //   // watcher.on("all", (event, filePath) => {
      
  //   //   if (event === 'add' || event === 'change') {
  //   //     const now = Date.now();
  //   //     const lastTime = lastTouched.get(filePath) || 0;
        
  //   //     // Prevent infinite loops caused by our own `touch` commands
  //   //     if (now - lastTime < 1500) {
  //   //        return;
  //   //     }

  //   //     const container = activeContainers.get(projectId);
  //   //     if (container) {
  //   //       const normalizedPath = filePath.replace(/\\/g, '/');
  //   //       const relativePath = normalizedPath.split(`projects/${projectId}/`)[1];
  //   //       if (relativePath) {
  //   //         const containerPath = `/home/sandbox/app/${relativePath}`;
  //   //         console.log(`Sending touch command to container for: ${containerPath}`);
  //   //         lastTouched.set(filePath, now);

  //   //         // Add a small delay to ensure the file system sync from Windows host to Docker VM is complete
  //   //         // before we trigger the inotify event inside the container.
  //   //         setTimeout(() => {
  //   //           container.exec({
  //   //             Cmd: ['touch', containerPath],
  //   //             AttachStdout: false,
  //   //             AttachStderr: false
  //   //           }, (err, exec) => {
  //   //             if (!err && exec) {
  //   //               exec.start({ hijack: true }, () => {}); 
  //   //             }
  //   //           });
  //   //         }, 300);
  //   //       }
  //   //     }
  //   //   }
  //   // });
  // }

  socket.on("getPort", ()=>{
    console.log("port requested");
    listContainers();
  })

  handleEditorSocketEvents(socket, editorNamespace);

  socket.on("disconnect", async () => {
    //await watcher.close();
    console.log("editor disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const webSocketForTerminal = new WebSocketServer({
  noServer: true,
});

server.on("upgrade", async (req, tcpSocket, head) => {
  // req : incoming http request
  //socket : TCP connection
  // head : first packet of the upgraded stream
  const isTerminal = req.url.includes("/terminal");
  if (isTerminal) {
    const projectId = req.url.split("=")[1]; 
    await handleContainerCreate(projectId, webSocketForTerminal, req, tcpSocket, head);
  }
});

webSocketForTerminal.on("connection", (ws, req, container) => {
  console.log("Terminal connected");

  handleTerminalCreation(ws, container);

  ws.on("close", () => {
    console.log("Terminal disconnected");
    container.remove({force: true}, (err, data)=> {
      if(err){
        console.log("Error while removing container",err);
      }
      console.log("container removed",data);
    });
  });
});
