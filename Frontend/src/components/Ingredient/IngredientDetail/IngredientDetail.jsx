import React from 'react';

const IngredientDetail = ({ ingredient }) => {
    const { product, type, provider, note } = ingredient;

    return (
        <div className="ingredient-detail">
            <h2>{product}</h2>
            <p>Type: {type}</p>
            <p>Provider: {provider}</p>
            <p>Note: {note}</p>
        </div>
    );
};

export default IngredientDetail;
