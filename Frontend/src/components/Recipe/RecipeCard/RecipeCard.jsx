import React from 'react'
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="recipe-card card">
            <h3>{recipe.recipeName}</h3>
            <p>{recipe.type}</p>
            <Link to={`/recipes/${recipe._id}`}>View Details</Link>
        </div>
    )
}

export default RecipeCard