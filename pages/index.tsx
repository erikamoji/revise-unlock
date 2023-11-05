// pages/index.tsx

import React, { useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fnftId, setFnftId] = useState('');

  const subscribeToNotifications = async () => {
    try {
      const response = await axios.post('http://localhost:3001/subscribe', { email, fnftId });
      console.log('Subscription successful', response.data);
    } catch (error) {
      console.error('Subscription failed', error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter FNFT ID"
        value={fnftId}
        onChange={(e) => setFnftId(e.target.value)}
      />
      <button onClick={subscribeToNotifications}>Subscribe</button>
    </div>
  );
};

export default Home;
