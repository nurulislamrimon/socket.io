import express from "express";
import http from "http";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 5000;

const root_dir = dirname(fileURLToPath(import.meta.url));

const indexHtml = root_dir + "/ejs/index.html";

const server = http.createServer(app);
app.get("/", (req, res) => {
  res.sendFile(indexHtml);
  //   res.send({ result: "success" });
});

server.listen(port, () => console.log(`Server is listening at port: ${port}`));
