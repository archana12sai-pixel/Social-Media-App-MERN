const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("sendMessage", (msg) => {
    socket.broadcast.emit("receiveMessage", msg);
  });
});

server.listen(5000, () => console.log("Server running"));
