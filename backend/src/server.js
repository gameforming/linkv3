import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

  res.json({
    status: "online"
  });

});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket => {

  console.log("user connected");

  socket.on("disconnect", () => {

    console.log("user disconnected");

  });

});

server.listen(
  process.env.PORT || 10000,
  () => console.log("server started")
);
