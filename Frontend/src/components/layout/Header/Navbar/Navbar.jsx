import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const user = useSelector((state) => state.auth.user)
    return (
        <nav>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/cost-list'}>Cost</NavLink>
            <NavLink to={'/recipes'}>Recipes</NavLink>
            <NavLink to={'/ingredients'}>Ingredients</NavLink>
            {user ?
                <NavLink to={'/profile'}>{user.firstName}</NavLink>
                :
                <NavLink to={'/login'}>Login</NavLink>
            }
        </nav>
    )
}

export default Navbar