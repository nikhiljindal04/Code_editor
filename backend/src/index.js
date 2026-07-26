import express from "express";
import { PORT } from "./config/serverConfig.js";
import cors from "cors";
import apiRouter from "./routes/index.js";
import { createServer } from "http";
import { Server } from "socket.io";
import chokidar from "chokidar";
import path from "path";
import { handleEditorSocketEvents } from "./socketHandlers/editorEventHandler.js";

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

  if (projectId) {
    var watcher = chokidar.watch(`./projects/${projectId}`, {
      ignored: (path) => path.includes("node_modules"),
      persistent: true, //watcher will run till app is running
      awaitWriteFinish: {
        stabilityThreshold: 2000,
      },
      ignoreInitial: true, //ignore the initial add events
    });
    watcher.on("all", (event, path) => {
      console.log(event, path);
    });
  }

  handleEditorSocketEvents(socket);

  socket.on("disconnect", async () => {
    await watcher.close();
    console.log("editor disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
