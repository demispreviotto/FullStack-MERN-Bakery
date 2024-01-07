import React, { useEffect, useState } from 'react'
import './NewRecipe.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../../../features/ingredient/ingredientSlice'

const NewRecipe = ({ toggleModal }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAll())
    }, [])
    const availableIngredients = useSelector((state) => state.ingredient.ingredients)
    const [newRecipe, setNewRecipe] = useState(
        {
            recipeName: '',
            type: '',
            presentation: '',
            ingredients: [],
            instructions: '',
            note: '',
        }
    )

    const handleInputChange = (e) => {
        setNewRecipe({
            ...newRecipe,
            [e.target.name]: e.target.value,
        });
    };

    const handleIngredientSelect = (e) => {
        const selectedIngredientName = e.target.value;
        const selectedIngredient = availableIngredients.find(
            (ingredient) => ingredient.ingredientName === selectedIngredientName
        )
        setNewRecipe({ ...newRecipe, ingredients: [...newRecipe.ingredients, { ingredient: selectedIngredient._id, qty: 0 }] })
    }
    const handleQtyChange = (e, index) => {
        const newIngredients = [...newRecipe.ingredients];
        newIngredients[index].qty = e.target.value
        setNewRecipe({ ...newRecipe, ingredients: newIngredients })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        // localStorage.setItem("newRecipe:", JSON.stringify(newRecipe))
        console.log(newRecipe)
        toggleModal()
    }

    return (
        <>
            <h2>New Recipe</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="recipeName" placeholder='Recipe Name' onChange={handleInputChange} />
                <input type="text" name="type" placeholder='Type' onChange={handleInputChange} />

                <div>
                    {newRecipe.ingredients.map((selectedIngredient, index) => (
                        <div className='input-group ingredient-field' key={index}>
                            <input type="text" value={selectedIngredient.ingredient} disabled />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={selectedIngredient.qty}
                                onChange={(e) => handleQtyChange(e, index)}
                            />
                        </div>
                    ))}
                </div>
                <select name="ingredient" onChange={handleIngredientSelect}>
                    <option defaultValue="Select an Ingredient">
                        Select an Ingredient
                    </option>
                    {availableIngredients.map((ingredient) => (
                        <option key={ingredient._id} value={ingredient.ingredientName}>
                            {ingredient.ingredientName}
                        </option>
                    ))}
                </select>


                <textarea name="instructions" id="instructions" cols="30" rows="10" placeholder='nota...' maxLength={1000} onChange={handleInputChange}></textarea>
                <textarea name="notas" id="notas" cols="30" rows="10" placeholder='nota...' maxLength={255} onChange={handleInputChange}></textarea>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default NewRecipe