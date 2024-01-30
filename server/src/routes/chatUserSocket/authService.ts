// authService.ts
import { PrismaClient } from '@prisma/client';
import { Socket, Server } from 'socket.io';

const prisma = new PrismaClient();

const connectedUsers: Record<string, { name: string; serverId: number; profileId: number }> = {};

type AuthenticateUserArgs = {
  socket: Socket;
  name: string;
  serverId: number;
  profileId: number;
  io: Server;
};

const authenticateUser = async ({io, socket, name, serverId,  profileId  }: AuthenticateUserArgs) => {

  connectedUsers[socket.id] = { name, serverId, profileId };


  try {
    const existingServer = await prisma.server.findUnique({
      where: {
        id: serverId,
      },
    });

    if (!existingServer) {
      throw new Error('El servidor al que intentas unirte no existe');
    }

    const isMember = await prisma.member.findFirst({
      where: {
        profileId,
        serverId:serverId,
      },
    });

    if (isMember) {
      throw new Error('El usuario ya está en este servidor');
    }

    await prisma.member.create({
      data: {
        role: 'GUEST',
        server: { connect: { id: serverId } },
        profile: { connect: { id: profileId } },
      },
    });

    io.emit('updateUserList', Object.values(connectedUsers));


    console.log(`Usuario se ha unido al servidor: ${existingServer.name}`);

    return true;
  } catch (error:any) {
    
  }
  // Emitir evento de actualización de lista de usuarios autenticados
  io.emit('updateUserList', Object.values(connectedUsers));

  return true; // Autenticación exitosa
};

const disconnectUser =  async (io:any, socket: Socket) => {
  try {
    const userId = connectedUsers[socket.id]?.profileId;

    if (userId) {
      await prisma.member.deleteMany({
        where: {
          profileId: userId,
        },
      });

      console.log(`User disconnected: ${userId}`);

      delete connectedUsers[socket.id];
      io.emit('updateUserList', Object.values(connectedUsers));
    }
  } catch (error:any) {
    console.error('Error during disconnection:', error.message);
  }


  // Eliminar el ID del usuario desconectado del objeto
  delete connectedUsers[socket.id];

  // Emitir evento de actualización de lista de usuarios autenticados
  io.emit('updateUserList', Object.values(connectedUsers));
};

export { authenticateUser, disconnectUser, connectedUsers };

