import express from "express";
import "dotenv/config";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import profilesRouter from "./routes/profiles.routes";
import authenticationRoute from "./routes/authentication.routes";
import { handleSocketConnection } from '../src/routes/auth/handleSocketConnection';

const app = express();
const server = http.createServer(app); // Conectar Express al servidor HTTP

app.use(express.json());


// Configurar CORS
app.use(cors({ 
  origin: 'http://localhost:3000',
  credentials: true,
}));

const { PORT } = process.env || 4000;
app.use("/api", profilesRouter);
app.use("/api", authenticationRoute);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  handleSocketConnection(io, socket)
});


server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
