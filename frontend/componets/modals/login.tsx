
// En tu componente de inicio de sesión (login) en Next.js

import { useState } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import styles from '@/styles/auth/auth.module.css'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  
  const handleLogin = async () => {
    const socket = io('http://localhost:4000');

    socket.emit('authenticate', { email, password });
    // Escucha el evento de autenticación exitosa o fallida
    socket.on('authenticated', ({ success }) => {
      if (success) {
        Cookies.set('userToken', email, { expires: 7 }); // Puedes ajustar el tiempo de expiración según tus necesidades

        console.log('Autenticación exitosa');
        router.push("/")
        // Realizar acciones adicionales después de la autenticación exitosa
      } else {
        console.log('Autenticación fallida');
        // Mostrar un mensaje de error o realizar acciones adicionales después de la autenticación fallida
      }
    });

    socket.on('authenticationSuccess', ({ additionalData }) => {
      Cookies.set('additionalData', JSON.stringify(additionalData)); // Puedes ajustar el tiempo de expiración según tus necesidades
    });
  };

  return (
    <div className={styles.contentLogin}>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default Login;