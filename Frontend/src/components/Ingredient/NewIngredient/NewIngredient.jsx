import React, { useEffect, useState } from 'react'
import './NewIngredient.css'

const NewIngredient = ({ toggleModal }) => {
    const [newIngredient, setNewIngredient] = useState(
        {
            ingredientName: '',
            type: '',
            provider: '',
            brand: '',
            presentation: '',
            // "psentacion (gr/ml)": '',
            measure: '',
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

    useEffect(() => {
        const cost = parseFloat(newIngredient.cost);
        const presentation = parseFloat(newIngredient.presentation);
        if (!isNaN(cost) && !isNaN(presentation) && presentation > 0 && cost > 0) {
            const calculatedPrice = cost / presentation;
            setNewIngredient({
                ...newIngredient,
                price: calculatedPrice.toFixed(2),
            });
        }
    }, [newIngredient.cost, newIngredient.presentation]);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newIngredient)
        // toggleModal()
    }

    return (
        <>
            <h2>New Ingredient</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="ingredientName" placeholder='Ingredient Name' onChange={handleInputChange} />
                <input type="text" name="type" placeholder='Type' onChange={handleInputChange} />
                <input type="text" name="provider" placeholder='Provider' onChange={handleInputChange} />
                <input type="text" name="brand" placeholder='Brand' onChange={handleInputChange} />
                <div className='input-group'>
                    <input type="number" name="presentation" placeholder='Presentation (gr/ml)' onChange={handleInputChange} />
                    <select name="measure" id="measure" onchange={handleInputChange}>
                        <option value="ml">ml</option>
                        <option value="mg">mg</option>
                        <option value="un">un</option>
                    </select>
                </div>
                <input type="number" name="cost" placeholder='Cost' onChange={handleInputChange} />
                <input type="number" name="price" placeholder='Price (gr/ml)' value={newIngredient.price} disabled />
                <textarea name="note" id="note" cols="30" rows="10" placeholder='Notes...' maxLength={255} onChange={handleInputChange}></textarea>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default NewIngredient