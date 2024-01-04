import React from 'react'
import Navbar from './Navbar/Navbar'
import './Header.css'

const Header = () => {

    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));

    const initialState = {
        token: token || null,
        user: user || null,
    };

    return (
        <div className='container header'>
            <Navbar />
        </div>
    )
}

export default Header