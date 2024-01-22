// handleSocketConnection.ts
import { authenticateUser, disconnectUser, connectedUsers } from "./authService";
import { Server, Socket } from 'socket.io';

const handleSocketConnection = (io: Server, socket: Socket) => {
  console.log(io.engine.clientsCount);

  // Agregar el ID del usuario al objeto de usuarios conectados
  connectedUsers[socket.id] = ''; // Inicializar con un nombre de usuario vacío

  // Emitir evento de usuarios conectados a todos los clientes
  io.emit("updateUserList", Object.values(connectedUsers));

  socket.on("authenticate", ({ name }) => {
    const isAuthenticated = authenticateUser({io, socket, name });
    console.log("user", name);

    if (isAuthenticated) {
      // Actualizar el nombre del usuario después de la autenticación exitosa
      connectedUsers[socket.id] = name;

      // Emitir evento de autenticación exitosa
      socket.emit("authenticated", { success: true });

      // Emitir evento de usuarios conectados a todos los clientes
      io.emit("updateUserList", Object.values(connectedUsers));
    } else {
      // Emitir evento de autenticación fallida
      socket.emit("authenticated", { success: false });
    }
  });

  socket.on("disconnect", () => {
    disconnectUser(io, socket);
  });
};

export { handleSocketConnection };
