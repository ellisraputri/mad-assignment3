import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Basic route
app.get("/", (req, res) => {
    res.send("Server is running with ES Modules 🚀");
});

let userList = [];

// Socket connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("addUser", ({name}) => {
        userList.push(name);
        io.emit("getUsers", userList);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = 5000;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});