import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { MdDelete } from "react-icons/md";
const socket = io('http://localhost:3000');

function NotificationAddMedicine() {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);



    useEffect(() => {
      
        fetchNotifications();
        
    }, []);
  const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:3000/notification/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setNotifications(response.data.notifications);
               
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        const deleteNotification = async (id) => {
            try {
                await axios.delete(`http://localhost:3000/notification/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                fetchNotifications();
            } catch (error) {
                console.error("Error deleting notification:", error);
            }
        };
    
    useEffect(() => {
        socket.on('newMedicineNotification', (data) => {
            setNotifications((prevNotifications) => [
                { notification: `${data.message}: ${data.medicineName}`, isRealTime: true },
                ...prevNotifications,
            ]);
        });

        return () => {
            socket.off('newMedicineNotification');
        };
    }, []);

    const toggleNotifications = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <div className="cursor-pointer" onClick={toggleNotifications}>
                <FontAwesomeIcon icon={faBell} size="2x" />
                {notifications.length > 0 && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center">
                        {notifications.length}
                    </div>
                )}
            </div>
            {isOpen && (
                <div className="absolute top-10 right-0 md:w-96 w-52 bg-white rounded-lg shadow-lg p-4">
                    <ul>
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <li key={index} className='flex justify-between'>
                                   <span > {notification.notification}</span>
                                    {notification.isRealTime && <span className="text-green-500"> (New)</span>
                                    }
                                    <button
                                        onClick={() => deleteNotification(notification._id)}
                                        className="text-red-500 text-2xl"
                                    >
                                        <MdDelete />
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li>No new notifications</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default NotificationAddMedicine;
