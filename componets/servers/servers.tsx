import style from '@/styles/servers/servers.module.css'
import Server from '../servers/server'
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import serversData from '../../servers.json';


const servers = () => {
  const { data: session } = useSession();
  return (
    <div >
      <div className={style.content}>

        <div className={style.contentServers}>
          <h6>Servers</h6>
          <h4>{session?.user?.name}</h4>
          {
            serversData.map(server => (
              <Server
                key={server.id}
                name={server.name}
                level={server.level}
              />
            ))
          }
          {session && (
            <Link href="#" onClick={() => signOut()} className={style.signinBtn}>
              Logout
            </Link>
          )}
        </div>
      </div>

    </div>
  )
}
export default servers;


//https://blog.logrocket.com/how-to-use-nextauth-js-client-side-authentication-next-js/     next auth
