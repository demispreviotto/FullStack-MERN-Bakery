import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VscAccount } from "react-icons/vsc";
import './Profile.css'
import RecipeCard from '../../Recipe/RecipeCard/RecipeCard'
import { getLoggedUser } from '../../../features/auth/authSlice'
const Profile = () => {
    const user = useSelector((state) => state.auth.user)
    const userRecipes = useSelector((state) => state.auth.userRecipes)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLoggedUser())
        // console.log(user)
    }, [])
    return (
        <div className='container'>
            <div className="avatar">
                {user.avatar ? <img src={user.avatar} alt="" /> : <VscAccount />}
            </div>
            <h2>{user.firstName} {user.lastName}</h2>
            <h3>{user.email}</h3>
            <p>{user.role}</p>
            <div>
                {userRecipes?.map((recipe) =>
                    < RecipeCard key={recipe._id} recipe={recipe} />
                )}
            </div>
        </div>
    )
}

export default Profile