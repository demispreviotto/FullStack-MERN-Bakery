import React, { useState } from 'react'
import './NewIngredient.css'

const NewIngredient = ({ toggleModal }) => {
    const [newIngredient, setNewIngredient] = useState(
        {
            producto: '',
            tipo: '',
            provedor: '',
            marca: '',
            'presentacion (gr/ ml)': '',
            costo: '',
            "precio (gr/ml)": '',
            nota: '',
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
                <input type="text" name="producto" placeholder='producto' onChange={handleInputChange} />
                <input type="text" name="tipo" placeholder='tipo' onChange={handleInputChange} />
                <input type="text" name="provedor" placeholder='provedor' onChange={handleInputChange} />
                <input type="text" name="marca" placeholder='marca' onChange={handleInputChange} />
                <input type="text" name="presentacion (gr/ml)" placeholder='presentacion (gr/ml)' onChange={handleInputChange} />
                <input type="text" name="costo" placeholder='costo' onChange={handleInputChange} />
                <input type="number" name="precio (gr/ml)" placeholder='precio (gr/ml)' onChange={handleInputChange} />
                <textarea name="notas" id="notas" cols="30" rows="10" placeholder='nota...' onChange={handleInputChange}></textarea>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default NewIngredient