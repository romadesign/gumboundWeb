global.setImmediate = global.setImmediate || ((fn: any, ...args: any) => global.setTimeout(fn, 0, ...args));

import { render, screen, waitFor } from '@testing-library/react';
import { useSocketServer } from '../../../hooks/useSocketServer';
import ServerPage from '@/pages/server/[id]';

//Next.js router error while testing using React-testing-library
//link : https://stackoverflow.com/questions/68398929/next-js-router-error-while-testing-using-react-testing-library
import { useRouter } from 'next/router'

jest.mock('../../../hooks/useSocketServer');

// Mock de useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock de push
const mockPush = jest.fn();

// Configuración del mock de useRouter
(useRouter as jest.Mock).mockImplementation(() => ({
  pathname: '/',
  push: mockPush,
}));

// describe('ServerPage Component', () => {

//   it('renders status user connected', async () => {
//     const setIsConnectedMock = jest.fn(); // Mock del método setIsConnected

//     // Mock useSocketServer hook
//     (useSocketServer as jest.Mock).mockReturnValue({
//       isConnected: true,
//       userList: [
//         {
//           id: 1,
//           name: 'romacode'
//         }],

//       setIsConnected: setIsConnectedMock, // Proporciona el mock del método setIsConnected

//     });


//     render(<ServerPage />);

//     // Espera a que se complete la acción asíncrona (si es asíncrona)
//     await waitFor(() => {
//       // Verifica que el método setIsConnected se llame con true
//       expect(setIsConnectedMock).toHaveBeenCalledWith(true);
//     });

//   });
// });

describe('ServerPage Component', () => {

  it('renders status user connected', () => {
    // Mock useSocketServer hook
    (useSocketServer as jest.Mock).mockReturnValue({
      isConnected: true,
      userList: [
        {
          id: 1,
          name: 'romacode'
        }],
    });

    render(<ServerPage />);

    // Muestra en la consola el contenido de userList
    const { userList } = useSocketServer();
    console.log('User List:', userList);

    // Asegura que el componente principal esté presente
    expect(screen.getByTestId('server-page')).toBeInTheDocument();
  });
});

describe('ServerPage', () => {
  it('renders component with connected users', async () => {
    render(<ServerPage />);
    // Asegura que el componente principal esté presente
    expect(screen.getByTestId('server-page')).toBeInTheDocument();

    // Otras aserciones específicas según la estructura de tu componente
    // Puedes buscar elementos por etiquetas, clases, etc., según tu implementación

    // Ejemplo:
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('subnavbar')).toBeInTheDocument();
    expect(screen.getByTestId('rooms-list')).toBeInTheDocument();
    // ...
  })

})
