import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
const socket = io('http://localhost:3000');

const NotificationAddPrescription = () => {
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
        socket.on('newPrescriptionNotification', (data) => {
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                {notification: `${data.message}`,isRealTime: true},
            ]);
        });

     
        return () => {
            socket.off('newPrescriptionNotification');
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
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-sm">
                        {notifications.length}
                    </span>
                )}
            </div>

           
            {isOpen && (
                <div className="absolute right-0 mt-2 md:w-96 w-52 bg-white shadow-lg p-4 rounded">
                    <h3 className="font-bold">Notifications</h3>
                    <ul>
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => (
                                <li key={index} className="my-2 border-b pb-2 flex justify-between ">
                                    {notification.notification}
                                    {notification.isRealTime && <span className="text-green-500"> (New)</span>}
                                    <button
                                        onClick={() => deleteNotification(notification._id)}
                                        className="text-red-500 hover:text-red-700 text-2xl"
                                    >
                                        <MdDelete />
                                    </button>

                                </li>
                            ))
                        ) : (
                            <li >No new notifications</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NotificationAddPrescription;
