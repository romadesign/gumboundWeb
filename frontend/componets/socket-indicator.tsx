import { use, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Home = () => {
  const [userList, setUserList] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  console.log(userList)

  useEffect(() => {
    const socket = io('http://localhost:4000');

    // Escuchar el evento de conexión exitosa
    socket.on('connect', () => {
      setIsConnected(true);

      // Escuchar el evento de actualización de la lista de usuarios
      socket.on('updateUserList', (users) => {
        setUserList(users);
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
            {userList.map((user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
          asdasda
        </div>
      ) : (
        <p>Conectando...</p>
      )}
    </div>
  );
};

export default Home;
