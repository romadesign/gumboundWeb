import { authenticateUser, disconnectUser, connectedUsers } from "./authService";
import { Server, Socket } from 'socket.io';

const handleSocketConnection = (io: Server, socket: Socket) => {
  console.log(io.engine.clientsCount);
  socket.on("authenticate", async ({ email, password }) => {
    const isAuthenticated = await authenticateUser({ socket, email, password });
    if (isAuthenticated) {
      // Emitir evento de autenticación exitosa
      socket.emit("authenticated", { success: true });
    } else {
      // Emitir evento de autenticación fallida
      socket.emit("authenticated", { success: false });
    }
  });

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
};

export { handleSocketConnection };