// import Navbar from "componets/navbar/navbar"
// import SubNavbar from "componets/navbar/subNavbar"
// import RoomsList from "componets/roomsList/roomsList"
// import Chat from 'componets/chat/chat'
// import Character from 'componets/character/character'
// import BuddyList from 'componets/listFriends/buddyList'
import Register from "componets/modals/register"
import Login from "componets/modals/login"
import styles from '@/styles/page.module.css'
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

// export const metadata = {
//   title: 'App Router',
// }

export default function Page() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.contentNavbar}>
        {/* <Navbar /> */}
        {/* <SubNavbar /> */}
      </div>
      <div className={styles.contentTwo}>
        <div className={styles.RoomsListAnChatContainer}>
          {/* <RoomsList />
          <Chat /> */}
        </div>

        <div className={styles.characterAndBuddyListContainer}>
          {/* <Character />
          <BuddyList /> */}
        </div>
      </div>
      <Register />
      <Login />

      {session && (
          <Link href="#" onClick={() => signOut()} className="btn-signin">
            Sign out
          </Link>
        )}
        {!session && (
          <Link href="#" onClick={() => signIn()} className="btn-signin">
            Sign in
          </Link>
        )}
      </div>
      )
}
