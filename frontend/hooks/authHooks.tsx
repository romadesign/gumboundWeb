import Cookies from 'js-cookie';
import { useState } from 'react';

export const useAuth = () => {
  
  const api = process.env.NEXT_PUBLIC_BACKAPI_URL
  

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${api}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Importante para incluir las cookies
      });

      const data = await response.json();
      if (data.success) {
        Cookies.set('status', true.toString(), { expires: 7 });
        location.reload()
      } else {
        console.log('Autenticación fallida:', data.message);
      }
    } catch (error) {
      console.log('Error durante la autenticación:', error);
    }
  };

  const register =  async (name:string , email:string, password:string) =>{
    const data = {name: name, email:email, password:password}
    // Realiza la solicitud de registro al backend
    try {
      const response = await fetch(`${api}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Registro exitoso, podrías redirigir al usuario o realizar otras acciones
      } else {
        // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
        console.log('Error en el registro');
      }
    } catch (error) {
      console.log('Error en la solicitud:', error);
    }
  }
 
  return {
    login,
    register
  };
};
