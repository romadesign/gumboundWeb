import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '@/components/modals/register'; // Utilizar @/components si no da error al importar


describe('Register Component', () => {
  //Pruebas de Renderización:
  it('renders the registration form correctly', () => {
    render(<Register />);

    // Asegura que los elementos del formulario estén presentes
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  //Pruebas de Interacción:
  it('submits the registration form correctly', async () => {
    render(<Register />);

    // Simula la entrada de datos en los campos del formulario
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Simula el envío del formulario
    fireEvent.click(screen.getByRole('button', { name: 'Register' }));

    // Espera a que ocurra alguna acción después del envío del formulario (por ejemplo, una redirección)
    await waitFor(() => {
      // Por ejemplo, verifica que los campos del formulario estén vacíos después del envío
      expect(screen.getByPlaceholderText('Name')).toHaveValue('');
      expect(screen.getByPlaceholderText('Email')).toHaveValue('');
      expect(screen.getByPlaceholderText('Password')).toHaveValue('');
    });
    //  expect(screen.getByText('User registered successfully')).toBeInTheDocument();
  });

});
