'use client'
import { useState } from "react";

const register = ({ }) => {

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })

  const { name, username, email, password } = formData;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitForm = async (e: any) => {
    e.preventDefault();

    // Realiza la solicitud de registro al backend
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
    <div>
      <form onSubmit={submitForm} >
        <input
          type='text'
          name='name'
          placeholder='name'
          value={name}
          onChange={handleChange}
        />
        <input
          type='text'
          name='username'
          placeholder='username'
          value={username}
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={handleChange}
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={handleChange}
        />
        <button >Register</button>
      </form>
    </div>
  )
}

export default register;