// __tests__/login.test.tsx
import Login from '@/components/modals/login';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Login Component: Successful login', () => {
  render(<Login />);

  it('Login form correctly', () => {
    // Ingresa credenciales válidas y envía el formulario
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'tu-email@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'tu-contraseña' } });
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
  })

  //Pruebas de Renderización:
  it('renders the Login  form correctly', () => {
    render(<Login />);

    // Asegura que los elementos del formulario estén presentes
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument();
  });
 

});

