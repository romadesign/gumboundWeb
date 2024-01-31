import { useState } from 'react';
import styles from '@/styles/auth/auth.module.css';
import { useAuth } from 'hooks/authHooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = (e: any) => {
    e.preventDefault();
  
    if (!email || !password) {
      // Manejar el caso de campos vacíos
      console.log('Por favor, completa todos los campos.');
      return;
    }
  
    login(email, password);
  };
  

  return (
    <div className={styles.contentLogin}>
      <form action="">
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
