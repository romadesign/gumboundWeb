import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const prisma = new PrismaClient();

type loginUserArgs = {
  email: string;
  password: string;
};

const loginService = async ({ email, password }: loginUserArgs) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      console.log(`User not found for email: ${email}`);
      return { success: false, message: 'Usuario no encontrado' }; // Autenticación fallida
    }

    // Verificar la contraseña solo si existe un usuario
    const passwordMatch = user.password ? bcrypt.compare(password, user.password) : false;

    if (passwordMatch) {
      console.log(`User authenticated: ${user.email}`);
      return { success: true, user: { id: user.id, email: user.email, /* Otros campos que quieras devolver */ } };
      
    } else {
      console.log(`Authentication failed for user: ${email}`);
      return { success: false, message: 'Credenciales incorrectas' }; // Autenticación fallida
    }

  } catch (error) {
    console.error('Error during authentication:', error);
    return { success: false, message: 'Error durante la autenticación' }; // Autenticación fallida debido a un error
  }
};

export { loginService };
