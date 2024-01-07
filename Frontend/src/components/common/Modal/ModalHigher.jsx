import React, { useState } from 'react'
import Modal from './Modal';

const ModalHigher = ({ children }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <>
            <button className='new-item-btn' onClick={toggleModal}>
                <span>+</span>
            </button>
            <Modal isOpen={modalOpen} onClose={toggleModal}>
                {React.cloneElement(children, {
                    toggleModal: toggleModal
                })}
            </Modal>
        </>
    )
}

export default ModalHigher