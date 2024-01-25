import style from '@/styles/servers/servers.module.css'
import Server from '../servers/server'
import Link from 'next/link';
import serversData from '../../servers.json';
import { useEffect, useState } from 'react';

interface Server {
  id: number;
  name: string;
  description: string;
  language: string;
  level: string;
  // Otras propiedades que pueda tener tu objeto Server
}

const servers = () => {
  const [servers, setServers] = useState<Server[]>([]);
  console.log(servers)

  servers.map((server) => {
    console.log(server.id)
  })

  const getServers = async() =>{
    try {
      const data = await fetch('http://localhost:4000/api/servers')
      const result = await data.json()
      setServers(result)
    } catch (error) {
      console.error('Error al traer los servidores:', error);
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'POST',
        credentials: 'include', // Importante para incluir las cookies
      });

      const data = await response.json();

      if (data.success) {
        window.location.reload(); // O realiza cualquier otra acción después del logout
      } else {
        console.log('Logout fallido:', data.message);
      }
    } catch (error) {
      console.error('Error durante el logout:', error);
    }
  };

  useEffect(() => {
    getServers()
  }, [])


  return (
    <div >
      <div className={style.content}>

        <div className={style.contentServers}>
          <h6>Servers</h6>
          <h4>romacode</h4>
          {
            servers.map(server => (
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
