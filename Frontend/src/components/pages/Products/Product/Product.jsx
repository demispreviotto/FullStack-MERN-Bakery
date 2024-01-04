import React from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
    return (
        <>
            <div>Product</div>
            <Link to='/product/:id'>Goto</Link>
        </>
    )
}

export default Product