import express from "express";
import { createServer } from "http";
import { dirname, join } from "path";
import { Namespace, Server } from "socket.io";
import { fileURLToPath } from "url";
// config
const port = 5000;
// app and server
const app = express();
const expressServer = createServer(app);
const io = new Server(expressServer);

// paths
const root_dir = dirname(fileURLToPath(import.meta.url));
const indexHtml = join(root_dir, "index.html");

app.get("/", (req, res) => {
  res.sendFile(indexHtml);
});
// first Namespace
const memberNsp = io.of("/member");
memberNsp.on("connection", (socket) => {
  memberNsp.send("Hello Member");
  console.log("New user connected to member namespace!");
  socket.on("disconnect", () => {
    console.log("member disconnected!");
  });
});
// second Namespace
const committeeNsp = io.of("/committee");
committeeNsp.on("connection", (socket) => {
  memberNsp.send("Hello Committee");
  console.log("New user connected to committee namespace!");
  socket.on("disconnect", () => {
    console.log("committee disconnected!");
  });
});

expressServer.listen(port, () =>
  console.log(`Server is listening at port: ${port}`)
);
