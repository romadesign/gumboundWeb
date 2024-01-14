// authService.ts
import { PrismaClient } from '@prisma/client';
import { Socket } from 'socket.io';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type AuthenticateUserArgs = {
  socket: Socket;
  email: string;
  password: string;
};

const connectedUsers = new Set();

const authenticateUser = async ({ socket, email, password }: AuthenticateUserArgs) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.log(`User not found for email: ${email}`);
      return false; // Autenticación fallida
    }

    // Verificar la contraseña solo si existe un usuario
    const passwordMatch = user.password ? bcrypt.compare(password, user.password) : false;

    if (passwordMatch) {
      connectedUsers.add(socket.id);
      // Emitir evento de actualización de lista de usuarios autenticados
      socket.emit('updateUserList', Array.from(connectedUsers.values()));

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
