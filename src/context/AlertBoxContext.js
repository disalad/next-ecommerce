// Code to display alert messages on the screen
'use client';

import { createContext, useState, useContext } from 'react';

const AlertBoxContext = createContext();

export function AlertBoxContextProvider({ children }) {
    const [error, setError] = useState('');
    const [type, setType] = useState('');

    const showAlert = (message, type) => {
        setError(message);
        setType(type ? type : 'info');
        // Hide alert after 5 seconds
        setTimeout(() => setError(null), 5000);
    };
    const hideAlert = () => setError('');

    const alertClasses = {
        success: 'bg-green-100 border-green-400 text-green-700',
        error: 'bg-red-100 border-red-400 text-red-700',
        warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
        info: 'bg-blue-100 border-blue-400 text-blue-700',
    };
    const selectedClasses = alertClasses[type] || alertClasses.error;

    return (
        <AlertBoxContext.Provider value={{ error, showAlert, hideAlert }}>
            {children}
            {error && (
                <div className='fixed top-[100] left-1/2 transform -translate-x-1/2 z-50'>
                    <div
                        className={`border px-4 py-3 rounded relative ${selectedClasses}`}
                        role='alert'
                    >
                        {/* <strong className='font-bold'>
                            {type === 'success'
                                ? 'Success!'
                                : type === 'error'
                                ? 'Error!'
                                : type === 'warning'
                                ? 'Warning!'
                                : 'Info!'}
                        </strong> */}
                        <span className='block ml-2 mr-12'>{error}</span>
                        {/* Added padding to avoid text overlap */}
                        <span className='absolute top-0 bottom-0 right-0 px-4 py-3'>
                            <svg
                                className='fill-current h-6 w-6 text-gray-500 hover:text-gray-800 cursor-pointer'
                                role='button'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                onClick={() => {
                                    setError(false); // Start fade-out
                                    setTimeout(() => setError(false), 300); // Hide after transition
                                }}
                            >
                                <title>Close</title>
                                <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
                            </svg>
                        </span>
                    </div>
                </div>
            )}
        </AlertBoxContext.Provider>
    );
}

export function useAlertBox() {
    return useContext(AlertBoxContext);
}
