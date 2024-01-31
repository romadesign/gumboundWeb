// use 'useEffect' to perform actions after component mount
import { useEffect, useState } from "react";
import styles from '@/styles/auth/auth.module.css'
import { useAuth } from "../../hooks/authHooks";

const Register = () => {
  const { register } = useAuth(); // Assuming you have a 'register' function in your 'authHooks'

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitFormRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Assuming 'register' function returns a Promise
    try {
      await register(name, email, password);
      // Optionally, you can perform a login after successful registration
      // await login(email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure (show an error message, etc.)
    }
  };

  return (
    <div className={styles.contentRegister}>
      <form onSubmit={submitFormRegister}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default Register;
