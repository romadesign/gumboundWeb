import style from '@/styles/servers/servers.module.css'
import Server from '../servers/server'
import Link from 'next/link';
import serversData from '../../servers.json';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

const servers = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'POST',
        credentials: 'include', // Importante para incluir las cookies
      });

      const data = await response.json();

      if (data.success) {
        Cookies.remove('login'); // Elimina la cookie
        Cookies.remove('status'); // Elimina la cookie
        window.location.reload(); // O realiza cualquier otra acción después del logout
      } else {
        console.log('Logout fallido:', data.message);
      }
    } catch (error) {
      console.error('Error durante el logout:', error);
    }
  };



  return (
    <div >
      <div className={style.content}>

        <div className={style.contentServers}>
          <h6>Servers</h6>
          <h4>romacode</h4>
          {
            serversData.map(server => (
              <Link href={`/server/${server.id}`} key={server.id}>
                <Server key={server.id} name={server.name} level={server.level} />
              </Link>
            ))
          }
          {/* <button className={style.signinBtn} onClick={handleLogout}>
            Logout
          </button> */}
          <button className={style.signinBtn} onClick={handleLogout}>Cerrar sesión</button>

        </div>
      </div>

    </div>
  )
}
export default servers;


//https://blog.logrocket.com/how-to-use-nextauth-js-client-side-authentication-next-js/     next auth
