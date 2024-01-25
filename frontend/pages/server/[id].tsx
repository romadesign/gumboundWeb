"use client"
import Navbar from 'componets/navbar/navbar';
import SubNavbar from 'componets/navbar/subNavbar';
import RoomsList from 'componets/roomsList/roomsList';
import Chat from 'componets/chat/chat';
import Character from 'componets/character/character';
import BuddyList from 'componets/listFriends/buddyList';
import styles from '@/styles/page.module.css'
import SocketIndicator from "componets/socketConnection"
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const ServerPage = () => {
  const router = useRouter();
  const { id } = router.query; 

  Cookies.set('serverId', id as string);


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
          <BuddyList />
        </div>
        <SocketIndicator serverId={id}/>
      </div>
    </div>
  );
};

export default ServerPage;
