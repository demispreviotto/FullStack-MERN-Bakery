import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetail from '../components/Ingredient/IngredientDetail';

const IngredientDetailPage = () => {
    const { id } = useParams();
    const ingredient = useSelector((state) =>
        state.ingredient.ingredients.find((ing) => ing._id === id)
    );

    if (!ingredient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="ingredient-detail-page">
            <IngredientDetail ingredient={ingredient} />
        </div>
    );
};

export default IngredientDetailPage;
