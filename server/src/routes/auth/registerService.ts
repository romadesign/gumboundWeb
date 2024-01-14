// authService.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type RegisterArgs = {
  name: string;
  email: string;
  password: string;
};

const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const registerUser = async ({ name, email, password }: RegisterArgs) => {
  try {
    // Validaciones de datos
    if (password.length < 8) {
      return { success: false, message: 'La contraseña debe tener al menos 8 caracteres' };
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      },
    });

    if (existingUser) {
      return { success: false, message: 'El usuario ya existe' };
    }

    // Crear un nuevo usuario con la contraseña en formato hash
    const passwordHash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash, // Cambié 'passwordHash' a 'password'
      },
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error('Error durante el registro de usuario:', error);
    return { success: false, message: 'Error interno del servidor' };
  }
};

export { registerUser };
