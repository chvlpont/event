// app/admin/messages/page.jsx
'use client';

import React from 'react';
import MessageList from './MessageList';

const MessagesPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl mb-4 text-white">Messages</h1>
      <MessageList />
    </div>
  );
};

export default MessagesPage;
