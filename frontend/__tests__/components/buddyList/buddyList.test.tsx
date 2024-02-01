import { render, screen } from '@testing-library/react';
import BuddyList from '@/components/listFriends/buddyList';


const mockUserList = [
    { name: 'Usuario1' },
    { name: 'Usuario2' },
    // Agrega más usuarios según sea necesario
];

test('renderiza BuddyList correctamente', () => {
    render(<BuddyList userList={mockUserList} isConnected={true} />);

    // Verifica que los nombres de los usuarios estén presentes en la lista renderizada
    mockUserList.forEach((user) => {
        const userElement = screen.getByText(user.name);
        expect(userElement).toBeInTheDocument();
    });

    // Verifica que el texto de "Conectando..." no esté presente cuando isConnected es verdadero
    const connectingText = screen.queryByText(/Conectando/i);
    expect(connectingText).not.toBeInTheDocument();
});

test('renderiza "Conectando..." cuando isConnected es falso', () => {
    render(<BuddyList userList={[]} isConnected={false} />);

    // Verifica que el texto de "Conectando..." esté presente cuando isConnected es falso
    const connectingText = screen.getByText(/Conectando/i);
    expect(connectingText).toBeInTheDocument();
});

test('no renderiza "Conectando..." cuando isConnected es verdadero', () => {
    render(<BuddyList userList={mockUserList} isConnected={true} />);

    // Verifica que el texto de "Conectando..." no esté presente cuando isConnected es verdadero
    const connectingText = screen.queryByText(/Conectando/i);
    expect(connectingText).not.toBeInTheDocument();
});
