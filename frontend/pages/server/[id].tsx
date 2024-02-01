"use client"
import Navbar from '@/components/navbar/navbar';
import SubNavbar from '@/components/navbar/subNavbar';
import RoomsList from '@/components/roomsList/roomsList';
import Chat from '@/components/chat/chat';
import Character from '@/components/character/character';
import BuddyList from '@/components/listFriends/buddyList';
import styles from '@/styles/page.module.css'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useSocketServer } from '../../hooks/useSocketServer';
import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const ServerPage = () => {
  const { isConnected, userList } = useSocketServer();
  const router = useRouter();
  const [serverId, setServerId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_BACKAPI_URL}`);

    if (typeof window !== 'undefined') {
      // Verifica si router.query y router.query.id existen
      if (router.query && router.query.id) {
        // Accede al número de la ruta actual
        const currentServerId = Array.isArray(router.query.id)
          ? router.query.id[0]  // Si es un array, toma el primer elemento
          : router.query.id;   // Si es un string, úsalo directamente

        // Actualiza el estado con el nuevo serverId
        setServerId(currentServerId);

        // Almacena el serverId en la cookie
        Cookies.set('serverId', String(currentServerId));
      }

    }
    
  }, [router.query]);

  return (
    <div data-testid="server-page">
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
