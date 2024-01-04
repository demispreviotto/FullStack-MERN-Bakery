import React from 'react'

const ProductPage = (product) => {

    return (
        <>
            <h1>ProductPage</h1>
            <h2>product.name</h2>
            <img src="" alt="product.img" />
            <table>
                <tr>
                    <th>Title1</th>
                    <th>Title2</th>
                </tr>
                <tr>
                    <td>Col1</td>
                    <td>Col2</td>
                </tr>
                <tr>
                    <td>Col1</td>
                    <td>Col2</td>
                </tr>
            </table>
        </>
    )
}

export default ProductPage