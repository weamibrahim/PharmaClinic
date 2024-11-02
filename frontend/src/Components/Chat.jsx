import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useToast } from '../Context/ToastContext';
import UserList from './UserList';
import DeleteConfirmModel from './DeleteConfirmModel';
import InputMessage from './InputMessage';
import Messages from './Messages';
const socket = io('https://pharmaclinic-production.up.railway.app');

function Chat() {
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const currentUserId = JSON.parse(localStorage.getItem('user'))._id;
  const [modalOpen, setModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://pharmaclinic-production.up.railway.app/user/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const startEditingMessage = (message) => {
    setEditingMessageId(message._id);
    setNewMessage(message.message);
  };

  const updateMessage = async () => {
    if (!editingMessageId) return;

    try {
      const response = await axios.put(
        `https://pharmaclinic-production.up.railway.app/message/${editingMessageId}`,
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setEditingMessageId(null);
      setNewMessage('');
      showToast(response.data.message, 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Error updating message', 'error');
      console.error('Error updating message:', err);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const response = await axios.delete(`https://pharmaclinic-production.up.railway.app/message/${messageId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
      showToast(response.data.message, 'success');
      setModalOpen(false);
    } catch (err) {
      showToast(err.response?.data?.message || 'Error deleting message', 'error');
      console.error('Error deleting message:', err);
    }
  };

  const fetchMessages = async (receiverId) => {
    try {
      const res = await axios.get(`https://pharmaclinic-production.up.railway.app/message/${currentUserId}/${receiverId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMessages(res.data.messages);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;
    try {
      await axios.post(
        'https://pharmaclinic-production.up.railway.app/message/send',
        {
          senderId: currentUserId,
          receiverId: selectedUser._id,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    socket.emit('joinRoom', currentUserId);

    socket.on('newMessage', (newMessages) => {

      if (
        (newMessages.senderId === currentUserId && newMessages.receiverId === selectedUser?._id) ||
        (newMessages.senderId === selectedUser?._id && newMessages.receiverId === currentUserId)
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessages]);
      }

    });

    socket.on('messageDeleted', (messageId) => {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
    });

    socket.on('messageUpdated', (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === updatedMessage._id ? { ...msg, message: updatedMessage.message } : msg
        )
      );
    });

    return () => {
      socket.off('newMessage');
      socket.off('messageDeleted');
      socket.off('messageUpdated');
    };
  }, [currentUserId, selectedUser]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    fetchMessages(user._id);
  };

  const confirmDeleteMessage = (messageId) => {
    setMessageToDelete(messageId);
    toggleModal();
  };

  return (
    <div className="chat-container mx-auto   ">
      <div className="grid grid-cols-5 gap-3 justify-between">
        <UserList users={users} handleUserSelect={handleUserSelect} />

        <div className="col-span-5 md:col-span-3 px-3">
          {selectedUser && (
            <div className=" mt-6 ">
              <h2 className='mb-2'>Chat with {selectedUser.name}</h2>

              <Messages messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                updateMessage={updateMessage}
                currentUserId={currentUserId}
                selectedUser={selectedUser}
                editingMessageId={editingMessageId}
                setEditingMessageId={setEditingMessageId}
                confirmDeleteMessage={confirmDeleteMessage}
                startEditingMessage={startEditingMessage}
              />
              <InputMessage message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
          )}
        </div>
      </div>


      <DeleteConfirmModel toggleModal={toggleModal} modalOpen={modalOpen} onDelete={() => deleteMessage(messageToDelete)} />
    </div>
  );
}

export default Chat;
