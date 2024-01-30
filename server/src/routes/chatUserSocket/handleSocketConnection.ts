// handleSocketConnection.ts
import { authenticateUser, disconnectUser, connectedUsers } from "./authService";
import { Server, Socket } from 'socket.io';

const handleSocketConnection = (io: Server, socket: Socket) => {

  // Emitir evento de usuarios conectados a todos los clientes
  io.emit("updateUserList", Object.values(connectedUsers));

  socket.on("joinServer", async ({ name, serverId, profileId }) => {
    console.log(serverId, "servidor connected")
    const isAuthenticated = await authenticateUser({ io, socket, name, serverId , profileId});
    console.log("user", name);

    if (isAuthenticated) {
      // Actualizar el nombre del usuario y el ID del servidor después de la autenticación exitosa
      connectedUsers[socket.id] = { name, serverId, profileId };

      // Emitir evento de autenticación exitosa
      io.emit("authenticated", { success: true });

      // Emitir evento de usuarios conectados a todos los clientes
      io.emit("updateUserList", Object.values(connectedUsers));
    } else {
      // Emitir evento de autenticación fallida
      io.emit("authenticated", { success: false });
    }
  });

  socket.on("chatMessage", ({ sender, message, roomId }) => {
    // Aquí puedes procesar el mensaje, almacenarlo en la base de datos si es necesario, y emitirlo a la sala específica.
    io.to(roomId).emit("chatMessage", { sender, message });
  });

  socket.on("disconnect", () => {
    disconnectUser(io, socket);
  });
};

export { handleSocketConnection };
