// useSocketServer.tsx
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface SocketIndicatorProps {
  serverId?: string | string[] | undefined;
}

export const useSocketServer = ({ serverId: initialServerId }: SocketIndicatorProps = {}) => {
  const [userList, setUserList] = useState<{ name: string }[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_BACKAPI_URL}`);
    const storedProfile = Cookies.get('profile');
    const profile = storedProfile ? JSON.parse(storedProfile) : null;

    if (!profile) {
      console.error('No se encontró el perfil en las cookies.');
      return;
    }

    const { name } = profile;

    // Obtener el serverId de la cookie o usar el inicial proporcionado
    const serverIdFromCookie = Cookies.get('serverId') || initialServerId;

    // Emitir el evento "authenticate" con el nombre del usuario y el serverId
    socket.emit('authenticate', { name, serverId: serverIdFromCookie });

    // Escuchar el evento de conexión exitosa
    socket.on('connect', () => {
      setIsConnected(true);

      // Escuchar el evento de actualización de la lista de usuarios
      socket.on('updateUserList', (users) => {
        setUserList(Object.values(users));
      });
    });

    // Limpiar el oyente cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
  }, [initialServerId]);

  return {
    userList,
    isConnected
  };
};
