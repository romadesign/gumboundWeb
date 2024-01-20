"use client"
import Navbar from 'componets/navbar/navbar';
import SubNavbar from 'componets/navbar/subNavbar';
import RoomsList from 'componets/roomsList/roomsList';
import Chat from 'componets/chat/chat';
import Character from 'componets/character/character';
import BuddyList from 'componets/listFriends/buddyList';
import styles from '@/styles/page.module.css'
import SocketIndicator from "componets/socket-indicator"

const ServerPage = () => {
 
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
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ServerPage;
