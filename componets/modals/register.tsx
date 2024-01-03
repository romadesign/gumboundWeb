'use client'
import { useState } from "react";
import styles from '@/styles/auth/auth.module.css'

const registerAndLogin = ({ }) => {

  const [formDataRegister, setFormDataRegister] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })

  const { name, username, email, password } = formDataRegister;

  const handleChangeRegister = (e: any) => {
    const { name, value } = e.target;
    setFormDataRegister((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitFormRegister = async (e: any) => {
    e.preventDefault();

    // Realiza la solicitud de registro al backend
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataRegister),
      });

      if (response.ok) {
        // Registro exitoso, podrías redirigir al usuario o realizar otras acciones
      } else {
        // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
        console.error('Error en el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };


  return (
    <div className={styles.contentRegister}>
      <form onSubmit={submitFormRegister} >
        <input
          type='text'
          name='name'
          placeholder='name'
          value={name}
          onChange={handleChangeRegister}
        />
        <input
          type='text'
          name='username'
          placeholder='username'
          value={username}
          onChange={handleChangeRegister}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={handleChangeRegister}
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={handleChangeRegister}
        />
        <button >Register</button>
      </form>


    
    </div>
  )
}

export default registerAndLogin;