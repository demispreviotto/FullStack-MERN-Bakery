import React from 'react';

const IngredientDetail = ({ ingredient }) => {
    return (
        <div className="ingredient-detail">
            <h2>{ingredient.product}</h2>
            <p>Type: {ingredient.type}</p>
            <p>Provider: {ingredient.provider}</p>
            <p>Note: {ingredient.note}</p>
        </div>
    );
};

export default IngredientDetail;
