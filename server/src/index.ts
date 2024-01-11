import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import profilesRouter from "./routes/profiles.routes";

const app = express();
const server = http.createServer(app); // Conectar Express al servidor HTTP

app.use(cors());
app.use(express.json());

const { PORT } = process.env || 4000;

app.use("/api", profilesRouter);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const connectedUsers = new Set();

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log(io.engine.clientsCount);

  // Agregar el ID del usuario al conjunto de usuarios conectados
  connectedUsers.add(socket.id);

  // Emitir evento de usuarios conectados a todos los clientes
  io.emit("updateUserList", Array.from(connectedUsers));

  socket.on("disconnect", () => {
    console.log("user disconnected");

    // Eliminar el ID del usuario desconectado del conjunto
    connectedUsers.delete(socket.id);

    // Emitir evento de usuarios conectados actualizado
    io.emit("updateUserList", Array.from(connectedUsers));
  });
});


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
