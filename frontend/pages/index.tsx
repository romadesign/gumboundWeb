"use client"

import Register from "componets/modals/register"
import Servers from "componets/servers/servers"
import Login from "componets/modals/login"
import styles from '@/styles/page.module.css'
import Cookies from "js-cookie";
import { useEffect, useState } from "react"
                    
export default function Page(props) {

  function checkAuthentication() {
    const userEmail = Cookies.get('status');
    return !!userEmail; // Devuelve true si el userEmail está presente
  }

  const [statusLog, setStatusLog] = useState(false);
  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    setStatusLog(isAuthenticated);
  }, []);


  return (
    <div className={styles.container}>

      {!statusLog ? (
        <div className={styles.contentAuth}>
          <Login />
          <Register />
        </div>
      ) : (
        <div>
            <Servers />
        </div>
      )}
    </div>
  )
}
