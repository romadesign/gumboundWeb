// authService.ts
import { PrismaClient } from '@prisma/client';
import { Socket } from 'socket.io';

const prisma = new PrismaClient();

const connectedUsers: Record<string, { name: string; serverId: number }> = {};

type AuthenticateUserArgs = {
  socket: Socket;
  name: string;
  serverId: number;
  io: any;
};

const authenticateUser = ({io, socket, name, serverId }: AuthenticateUserArgs) => {
  console.log("user", name);

  connectedUsers[socket.id] = { name, serverId };

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
