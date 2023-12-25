import express from "express";
import { createServer } from "http";
import { dirname, join } from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
// config
const port = 5000;
// app and server
const app = express();
const expressServer = createServer(app);
const io = new Server(expressServer);

io.on("connection", (socket) => {
  console.log("New user connected!");
  socket.on("disconnect", () => {
    console.log("User disconnected!");
  });
});

// paths
const root_dir = dirname(fileURLToPath(import.meta.url));
const indexHtml = join(root_dir, "index.html");

app.get("/", (req, res) => {
  res.sendFile(indexHtml);
});

expressServer.listen(port, () =>
  console.log(`Server is listening at port: ${port}`)
);
