// handleSocketConnection.ts
import { authenticateUser, disconnectUser, connectedUsers } from "./authService";
import { Server, Socket } from 'socket.io';

const handleSocketConnection = (io: Server, socket: Socket) => {
  console.log(io.engine.clientsCount);

// Agregar el ID del usuario al objeto de usuarios conectados
connectedUsers[socket.id] = { name: '', serverId: 0 }; // Inicializar con un nombre de usuario vacío y serverId 0


  // Emitir evento de usuarios conectados a todos los clientes
  io.emit("updateUserList", Object.values(connectedUsers));

  socket.on("authenticate", ({ name, serverId }) => {
    const isAuthenticated = authenticateUser({io, socket, name, serverId });
    console.log("user", name);

    if (isAuthenticated) {
      // Actualizar el nombre del usuario y el ID del servidor después de la autenticación exitosa
      connectedUsers[socket.id] = { name, serverId };

      // Emitir evento de autenticación exitosa
      io.emit("authenticated", { success: true });

      // Emitir evento de usuarios conectados a todos los clientes
      io.emit("updateUserList", Object.values(connectedUsers));
    } else {
      // Emitir evento de autenticación fallida
      io.emit("authenticated", { success: false });
    }
  });

  socket.on("disconnect", () => {
    disconnectUser(io, socket);
  });
};

export { handleSocketConnection };
