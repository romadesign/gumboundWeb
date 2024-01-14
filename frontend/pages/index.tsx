"use client"

import Navbar from "componets/navbar/navbar"
import SubNavbar from "componets/navbar/subNavbar"
import RoomsList from "componets/roomsList/roomsList"
import Chat from 'componets/chat/chat'
import Character from 'componets/character/character'
import BuddyList from 'componets/listFriends/buddyList'
import Register from "componets/modals/register"
import Servers from "componets/servers/servers"
import Login from "componets/modals/login"
import styles from '@/styles/page.module.css'
import Link from "next/link";
import SocketIndicator from "componets/socket-indicator"
// export const metadata = {
//   title: 'App Router',
// }
import Cookies from "js-cookie";
import { useEffect, useState } from "react"



export default function Page(props) {

  function checkAuthentication() {
    const userEmail = Cookies.get('userToken');
    return !!userEmail; // Devuelve true si el userEmail está presente
  }

  const [statusLog, setStatusLog] = useState(false);
  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    setStatusLog(isAuthenticated);
  }, []);

  // const socket = io("http://localhost:4000")
  // console.log(socket, "hol")

  return (
    <div className={styles.container}>

      {!statusLog ? (
        <div className={styles.contentAuth}>
          <Login />
          <Register />
        </div>
      ) : (
        <div>
            {/* <div className={styles.contentNavbar}>
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
            </div>
            <Servers /> */}
            <SocketIndicator />
        </div>
      )}
    </div>
  )
}
