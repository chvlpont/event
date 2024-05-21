
'use client';

import React from 'react';
import Link from 'next/link';

export const messages = [
  { id: 1, subject: 'Message 1', body: 'This is the body of message 1' },
  { id: 2, subject: 'Message 2', body: 'This is the body of message 2' },
  { id: 3, subject: 'Message 3', body: 'This is the body of message 3' },
];

function MessageList() {
  return (
    <div className="divide-y divide-gray-700">
      {messages.map(message => (
        <div key={message.id} className="bg-gray-800 p-4 shadow-lg grid grid-cols-3 gap-4 items-center">
          <h2 className="text-lg font-semibold col-span-2 text-white">{message.subject}</h2>
          <Link href={`/messages/${message.id}`}>
            <button className="w-full py-3 px-4 bg-blue-600 text-gray-200 rounded hover:bg-blue-900">
              View
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
