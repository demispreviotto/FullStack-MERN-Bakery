import React from 'react'
import './NewItemButton.css'

const NewItemButton = ({ toggleModal }) => {
    return (
        <button className='new-item-btn' onClick={toggleModal}>
            <span>+</span>
        </button>
    )
}

export default NewItemButton