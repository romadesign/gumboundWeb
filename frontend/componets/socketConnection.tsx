import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface SocketIndicatorProps {
  serverId: string | string[] | undefined;
}

const Home: React.FC<SocketIndicatorProps> = () => {
  const [userList, setUserList] = useState<{ name: string }[]>([]);
  const [isConnected, setIsConnected] = useState(false);
console.log(userList)
  useEffect(() => {
    const socket = io('http://localhost:4000');
    const storedProfile = Cookies.get('profile');
    const profile = storedProfile ? JSON.parse(storedProfile) : null;

    if (!profile) {
      console.error('No se encontró el perfil en las cookies.');
      return;
    }

    const { name } = profile;

    // Obtener el serverId de la cookie
    const serverIdFromCookie = Cookies.get('serverId');

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
  }, []);

  return (
    <div>
      {isConnected ? (
        <div>
          <h1>Usuarios Conectados:</h1>
          <ul>
            {userList.map((user, index) => (
              <li key={index}>{String(user.name)}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Conectando...</p>
      )}
    </div>
  );
};

export default Home;
