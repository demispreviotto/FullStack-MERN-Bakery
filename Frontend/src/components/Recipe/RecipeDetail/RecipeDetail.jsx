import React from 'react';
import { Link } from 'react-router-dom';

const RecipeDetail = ({ recipe }) => {
    const { recipeName, ingredients, instructions, updatedAt, userId, note, type } = recipe;
    return (
        <>
            <div className="recipe-detail" style={{ textAlign: 'justify' }}>
                <h2>{recipeName}</h2>
                <p className='author'>By: {userId.firstName}</p>
                <p className='type'>Type: {type}</p>
                <div className="ingredients">
                    <h3>Ingredients:</h3>
                    <ul style={{ listStyle: "none" }}>
                        {ingredients.map((ingredient) => <li key={ingredient._id}>{ingredient.ingredient.product} {ingredient.qty}</li>)}
                    </ul>
                </div>
                <h3 className='instructions'>Instructions: </h3>
                <p>{instructions}</p>
                <h3>Note:</h3>
                <p className='note'>{note}</p>
                <p className='updatedAt'>{updatedAt}</p>
            </div>
            <button><Link to='/recipes'>Go Back</Link></button>
        </>
    );
};

export default RecipeDetail;
