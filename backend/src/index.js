import express from "express";
import { PORT } from "./config/serverConfig.js";
import cors from "cors";
import apiRouter from "./routes/index.js"
import {createServer} from "http";
import {Server} from "socket.io";

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

io.on("connection", (socket) => {
    console.log("a user connected");
});

app.get("/ping", (req, res) => {
    res.send("pong");
});

app.use("/api", apiRouter);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});