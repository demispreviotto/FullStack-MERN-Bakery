import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Home = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className='home' style={{ height: '100%' }}>
            <h1>Welcome</h1>
            <button>
                {user ? <Link to=''>Go</Link> : <Link to='/login'>Login</Link>}
            </button>
        </div>
    )
}

export default Home