import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { reset } from '../../../features/auth/authSlice';
const Register = () => {
    const initialValue = { email: '', firstName: '', lastName: '', password: '' }
    const [data, setData] = useState(initialValue)
    const dispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const message = useSelector((state) => state.auth.message)
    const status = useSelector((state) => state.auth.status)

    useEffect(() => { dispatch(reset()) }, [])

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    };

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        dispatch(register(data))
        status === 'succeeded' ? (
            setIsSubmitting(false),
            setData(initialValue)
        ) : (
            setTimeout(() => {
                setIsSubmitting(false)
            }, 3000)
        )

    };

    return (
        <div className='lookup container'>
            <h2>Register</h2>
            <form onSubmit={handleOnSubmit} >
                <input type="text" placeholder='Email' name='email' required onChange={handleOnChange} />
                <input type="text" placeholder='Firt Name' name='firstName' required onChange={handleOnChange} />
                <input type="text" placeholder='Last Name' name='lastName' required onChange={handleOnChange} />
                <input type="password" placeholder='Password' name='password' required onChange={handleOnChange} />
                {message && <p className={status}>{message}</p>}
                <button disabled={isSubmitting}>Go</button>
            </form>
            <p>Already a user? <span><Link to='/login'>here</Link></span></p>
        </div>
    )
}

export default Register