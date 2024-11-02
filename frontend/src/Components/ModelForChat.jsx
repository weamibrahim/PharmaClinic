import React, { useState } from 'react';
import Chat from './Chat';
import { IoChatbubbleSharp } from "react-icons/io5";

function ModelForChat() {
    const [openButton, setOpenButton] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false); // State to control tooltip visibility

    const toggleButton = () => {
        setOpenButton(!openButton);
    };

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <>
            <button
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} 
                onClick={toggleButton}
                className="fixed bottom-20 right-4 w-12 h-12 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 z-50"
                type="button"
            >
                <IoChatbubbleSharp className='text-3xl mx-auto' />

            
                {showTooltip && (
                    <div className="absolute z-10 left-[-220px] top-[-20px] inline-block w-56 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                        <div className="px-1 py-2">
                            <p>Chat with Doctors</p>
                        </div>
                    </div>
                )}
            </button>

            <div
                id="static-modal"
                data-modal-backdrop="static"
                tabIndex="-1"
                aria-hidden="true"
                className={`${openButton ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 bg-black/50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
                <div className="relative p-4 w-full mx-auto max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center  bg-green-100 justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Chat with Doctors
                            </h3>
                            <button
                                onClick={toggleButton}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div>
                            <Chat />
                        </div>

                        <div className="flex justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium hover:bg-gray-400 text-gray-500 focus:outline-none  rounded-lg border border-gray-500  hover:text-white  focus:z-10 focus:ring-4 focus:ring-gray-100 "
                                onClick={toggleButton}
                            >
                                close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModelForChat;
