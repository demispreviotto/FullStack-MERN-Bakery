import React, { useState } from 'react'
import './NewIngredient.css'

const NewIngredient = ({ toggleModal }) => {
    const [newIngredient, setNewIngredient] = useState(
        {
            product: '',
            type: '',
            provider: '',
            brand: '',
            presentation: '',
            mesasure: '',
            cost: '',
            // "precio (gr/ml)": '',
            note: '',
        }
    )

    const handleInputChange = (e) => {
        setNewIngredient({
            ...newIngredient,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newIngredient)
    }

    return (
        <>
            <h2>New Ingredient</h2>
            <form onSubmit={() => {
                handleSubmit()
                toggleModal()
            }
            }>
                <input type="text" name="product" placeholder='product' onChange={handleInputChange} />
                <input type="text" name="type" placeholder='type' onChange={handleInputChange} />
                <input type="text" name="provider" placeholder='provider' onChange={handleInputChange} />
                <input type="text" name="brand" placeholder='brand' onChange={handleInputChange} />
                <input type="text" name="presentation" placeholder='presentation (gr/ml)' onChange={handleInputChange} />
                <select name="measure" id="measure">
                    <option value="mililiters">ml</option>
                    <option value="miligrams">mg</option>
                    <option value="unit">un</option>
                </select>
                <input type="text" name="cost" placeholder='cost' onChange={handleInputChange} />
                <input type="number" name="price" placeholder='price (gr/ml)' onChange={handleInputChange} />
                <textarea name="note" id="note" cols="30" rows="10" placeholder='note...' maxLength={255} onChange={handleInputChange}></textarea>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default NewIngredient