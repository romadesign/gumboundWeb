"use client"
import Navbar from 'componets/navbar/navbar';
import SubNavbar from 'componets/navbar/subNavbar';
import RoomsList from 'componets/roomsList/roomsList';
import Chat from 'componets/chat/chat';
import Character from 'componets/character/character';
import BuddyList from 'componets/listFriends/buddyList';
import styles from '@/styles/page.module.css'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useSocketServer } from 'hooks/useSocketServer';
import { useEffect, useMemo, useState } from 'react';


const ServerPage = () => {
  const { isConnected, userList } = useSocketServer();

  const router = useRouter();
  const [serverId, setServerId] = useState<string | undefined>(undefined);

  const serverIdCookie = Cookies.set('serverId', String(router.query.id) );

  useMemo(() => {
    // Verifica si router.query y router.query.id existen
    if (router.query && router.query.id) {
      // Accede al número de la ruta actual
      const currentServerId = Array.isArray(router.query.id)
        ? router.query.id[0]  // Si es un array, toma el primer elemento
        : router.query.id;   // Si es un string, úsalo directamente

      // Actualiza el estado con el nuevo serverId
      setServerId(serverIdCookie);
    }
  }, [serverId]);


  return (
    <div>
      <div className={styles.contentNavbar}>
        <Navbar />
        <SubNavbar />
      </div>
      <div className={styles.contentTwo}>
        <div className={styles.RoomsListAnChatContainer}>
          <RoomsList />
          <Chat />
        </div>
        <div className={styles.characterAndBuddyListContainer}>
          <Character />
          <BuddyList userList={userList} isConnected={isConnected}/>
        </div>
      </div>
    </div>
  );
};

export default ServerPage;
