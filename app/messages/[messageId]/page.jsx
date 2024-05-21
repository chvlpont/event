
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { messages } from '../MessageList';

const MessageDetailPage = () => {
  const { messageId } = useParams();

  console.log('messageId from params:', messageId); // Log id from params

  const message = messages.find(message => message.id === Number(messageId));

  console.log('messages:', messages); // Log the messages array




  if (!message) {
    return <div>Message not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl mb-4 text-white">{message.subject}</h1>
      <p className="text-gray-300">{message.body}</p>
    </div>
  );
};

export default MessageDetailPage;
