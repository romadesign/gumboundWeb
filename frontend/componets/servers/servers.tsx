import style from '@/styles/servers/servers.module.css'
import Server from '../servers/server'
import Link from 'next/link';
import serversData from '../../servers.json';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';


const servers = () => {

  const handleLogout = () => {
    // Limpiar información de autenticación
    Cookies.remove('userToken');

    // Desconectar el socket si existe
    const socket = io("http://localhost:4000");
    socket.disconnect();
    window.location.reload();

  };


  return (
    <div >
      <div className={style.content}>

        <div className={style.contentServers}>
          <h6>Servers</h6>
          <h4>romacode</h4>
          {
            serversData.map(server => (
              <Server
                key={server.id}
                name={server.name}
                level={server.level}
              />
            ))
          }
            <button className={style.signinBtn}  onClick={handleLogout}>
              Logout
            </button>
        </div>
      </div>

    </div>
  )
}
export default servers;


//https://blog.logrocket.com/how-to-use-nextauth-js-client-side-authentication-next-js/     next auth
