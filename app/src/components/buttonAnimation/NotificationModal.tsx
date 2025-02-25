import React from 'react';

const NotificationModal = ({ isNofifyModalOpen, onNotifyClose }) => {
    return (
        <div
            className={`z-50  fixed top-0 left-0 w-full h-full flex justify-center items-center bg-cA bg-opacity-50 ${isNofifyModalOpen ? 'block' : 'hidden'
                }`}
        >
            <div
                className=" bg-white rounded-lg p-4 w-1/2 md:w-1/3 xl:w-1/4 shadow-md"
                role="dialog"
                aria-modal="true"
                aria-labelledby="notification-modal-title"
            >
                <div className="flex justify-between items-center mb-4">

                    <button
                        className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out"
                        onClick={onNotifyClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <p className="text-3xl  text-center text-black mb-4">Wait for applying...</p>
            </div>
        </div>
    );
};

export default NotificationModal;