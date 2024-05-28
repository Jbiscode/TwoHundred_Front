import React, { Children } from "react";
import ReactDOM from 'react-dom'

const Modal = ({children, isModalOpen, onModalClose}) => {
    if(!isModalOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className="w-screen h-screen bg-black/30 fixed top-0 left-0 z-10 flex items-center justify-center">
                <div className="p-3 rounded-2xl bg-white w-11/12 max-w-lg mx-auto relative"> 
                    <div className="flex justify-end">
                        <button onClick={onModalClose} className="btn btn-ghost btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </>, 
        document.getElementById('modal-root')
    )
};

export default Modal;