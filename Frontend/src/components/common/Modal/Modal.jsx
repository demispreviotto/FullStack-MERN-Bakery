import React, { useRef, useEffect } from 'react';
import './Modal.css'

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef();

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden'; // Disable scrolling on the body
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto'; // Enable scrolling on the body
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto'; // Ensure scrolling is re-enabled when the component unmounts
        };
    }, [isOpen, onClose]);

    return (
        <>
            {isOpen ? (
                <div className='curtain'>
                    <div className="modal" ref={modalRef}>
                        {children}
                    </div>
                </div>
            ) : (null)}
        </>
    );
};

export default Modal;
