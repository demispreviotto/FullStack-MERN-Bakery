import React from 'react';
import { Link } from 'react-router-dom';
import './IngredientCard.css'

const IngredientCard = ({ ingredient }) => {
    return (
        <div className="ingredient-card card">
            <h3>{ingredient.product}</h3>
            <p>Type: {ingredient.type}</p>
            <p>Provider: {ingredient.provider}</p>
            <Link to={`/ingredients/${ingredient._id}`}>View Details</Link>
        </div>
    );
};

export default IngredientCard;
