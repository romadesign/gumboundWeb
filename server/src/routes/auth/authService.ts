// authService.ts
import { PrismaClient } from '@prisma/client';
import { Socket } from 'socket.io';

const prisma = new PrismaClient();

type AuthenticateUserArgs = {
  socket: Socket;
  email: string;
  password: string;
};
const connectedUsers = new Set();

const authenticateUser = async ({ socket, email, password }: AuthenticateUserArgs) => {
  try {
    // Validar datos de entrada si es necesario

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const profile = await prisma.profile.findUnique({
      where: {
        userId: user?.id
      }
    })

    if (user && user.password === password) {
      console.log(`User authenticated: ${email}`);
      connectedUsers.add(socket.id);
      // Emitir evento de actualización de lista de usuarios autenticados
      socket.emit('updateUserList', Array.from(connectedUsers.values()));

      // Emitir evento de autenticación exitosa con datos adicionales
      socket.emit('authenticationSuccess', {
        additionalData: { email: user.email, id: user.id, profile: profile }
      });

      return true; // Autenticación exitosa
    } else {
      console.log(`Authentication failed for user: ${email}`);
      return false; // Autenticación fallida
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    return false; // Autenticación fallida debido a un error
  }
};

const disconnectUser = (socket: Socket, connectedUsers: Map<string, string>) => {
  console.log('user disconnected');
  const email = connectedUsers.get(socket.id);
  connectedUsers.delete(socket.id);
  // Emitir evento de actualización de lista de usuarios autenticados
  socket.emit('updateUserList', Array.from(connectedUsers.values()));
};


export { authenticateUser, disconnectUser, connectedUsers };