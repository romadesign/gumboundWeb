// BuddyList.tsx

import styles from '@/styles/page.module.css';
import { useState } from 'react';

interface BuddyListProps {
  userList: { name: string }[];
  isConnected: boolean;
}

const BuddyList: React.FC<BuddyListProps> = ({ userList, isConnected }) => {
    console.log(userList)
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: string; message: string }[]>([]);



  return (
    <div className={styles.buddyListContainer}>
      <div>
        {isConnected ? (
        <ul>
        {userList.map((user, index) => (
          <li key={index}>{String(user.name)}</li>
        ))}
      </ul>
        ) : (
          <p>Conectando...</p>
        )}
      </div>
    </div>
  );
};

export default BuddyList;
