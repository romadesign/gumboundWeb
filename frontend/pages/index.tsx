"use client";

import Register from "@/components/modals/register";
import Servers from "@/components/servers/servers";
import Login from "@/components/modals/login";
import styles from '@/styles/page.module.css';
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Page(props) {
  const [statusLog, setStatusLog] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const status = Cookies.get('status');
        return !!status;
      } catch (error) {
        console.error('Error al obtener la cookie:', error);
        return false;
      }
    };

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
  );
}
