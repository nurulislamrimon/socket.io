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
  socket.join("member-room");
  const connectedMembers = io.sockets.adapter.rooms.get("member-room").size;
  io.sockets
    .in("member-room")
    .emit("discuss", "Hello everyone! connected = " + connectedMembers);

  socket.join("committee-room");
  const connectedCommittee =
    io.sockets.adapter.rooms.get("committee-room").size;
  io.sockets
    .in("committee-room")
    .emit(
      "meeting",
      "Hello honourable members! connected = " + connectedCommittee
    );
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
