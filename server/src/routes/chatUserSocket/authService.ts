// authService.ts
import { PrismaClient } from '@prisma/client';
import { Socket } from 'socket.io';

const prisma = new PrismaClient();

const connectedUsers: Record<string, string> = {}; // Objeto para almacenar ID de socket y nombre de usuario

type AuthenticateUserArgs = {
  socket: Socket;
  name: string; // Agrega el nombre de usuario como argumento
  io: any; 
};

const authenticateUser = ({io, socket, name }: AuthenticateUserArgs) => {
  console.log("user", name);

  connectedUsers[socket.id] = name;

  // Emitir evento de actualización de lista de usuarios autenticados
  io.emit('updateUserList', Object.values(connectedUsers));

  return true; // Autenticación exitosa
};

const disconnectUser = (io:any, socket: Socket) => {
  console.log('user disconnected');

  // Eliminar el ID del usuario desconectado del objeto
  delete connectedUsers[socket.id];

  // Emitir evento de actualización de lista de usuarios autenticados
  io.emit('updateUserList', Object.values(connectedUsers));
};

export { authenticateUser, disconnectUser, connectedUsers };
