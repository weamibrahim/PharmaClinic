import React, { useEffect, useRef } from 'react';
import { FaRegEdit } from "react-icons/fa";

function Messages({ 
  messages, 
  newMessage, 
  setNewMessage, 
  updateMessage, 
  currentUserId, 
  selectedUser, 
  editingMessageId, 
  setEditingMessageId, 
  confirmDeleteMessage, 
  startEditingMessage 
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages-container h-96 overflow-y-auto bg-gray-100 p-4 rounded shadow-sm">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className={`message-item flex items-center my-2 ${msg.senderId === currentUserId ? 'justify-start' : 'justify-end'}`}
        >
          <img
            src={msg.senderId === currentUserId ? JSON.parse(localStorage.getItem('user')).photo : selectedUser.photo}
            alt="User"
            className={`rounded-full w-10 h-10 ${msg.senderId === currentUserId ? 'mr-2' : 'ml-2 order-1'}`}
          />
          {editingMessageId === msg._id ? (
            <div className="flex items-center">
              <input
                type="text"
                className="message-input border rounded p-2 flex-grow"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Edit your message..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateMessage();
                  }
                }}
              />
              <button onClick={updateMessage} className="bg-green-500 text-white px-2 py-1 ml-2 rounded">Save</button>
              <button onClick={() => setEditingMessageId(null)} className="bg-red-500 text-white px-2 py-1 ml-2 rounded">Cancel</button>
            </div>
          ) : (
            <>
              <p
                className={`message-text cursor-pointer p-2 rounded ${msg.senderId === currentUserId ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                onClick={() => confirmDeleteMessage(msg._id)}
              >
                {msg.message}
              </p>
              <div onClick={() => startEditingMessage(msg)} className="cursor-pointer bg-slate-500 text-white p-2   rounded ml-2"><FaRegEdit className='text-lg '/></div>
            </>
          )}
        </div>
      ))}
      
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
