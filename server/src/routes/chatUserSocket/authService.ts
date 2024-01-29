// authService.ts
import { PrismaClient } from '@prisma/client';
import { Server, Socket } from 'socket.io';

const prisma = new PrismaClient();


type AuthenticateUserArgs = {
  socket: Socket;
  name: string;
  serverId: number;
  profileId: number;
  io: Server;
};

const connectedUsers: Record<string, { name: string; serverId: number; profileId: number }> = {};


const authenticateUser = async ({ io, socket, name, serverId, profileId }: AuthenticateUserArgs) => {
  connectedUsers[socket.id] = { name, serverId, profileId };

  try {
    const existingServer = await prisma.server.findUnique({
      where: {
        id: Number(serverId),
      },
    });

    if (!existingServer) {
      throw new Error('El servidor al que intentas unirte no existe');
    }

    const isMember = await prisma.member.findFirst({
      where: {
        profileId,
        serverId: Number(serverId),
      },
    });

    if (isMember) {
      throw new Error('El usuario ya está en este servidor');
    }

    await prisma.member.create({
      data: {
        role: 'GUEST',
        server: { connect: { id: Number(serverId) } },
        profile: { connect: { id: profileId } },
      },
    });

    io.emit('updateUserList', Object.values(connectedUsers));


    console.log(`Usuario se ha unido al servidor: ${existingServer.name}`);

    return true;
  } catch (error:any) {
    console.error('Error during authentication:', error.message);
    return false;
  }
};

const disconnectUser = async (io: Server, socket: Socket) => {
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
};

export { authenticateUser, disconnectUser, connectedUsers };
