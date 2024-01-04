// features/ingredient/IngredientList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../features/ingredient/ingredientSlice';
import IngredientCard from '../../components/Ingredient/IngredientCard';

const IngredientList = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.ingredient.ingredients);

    useEffect(() => {
        dispatch(getAll());
    }, [dispatch]);

    return (
        <div className="ingredient-list">
            <h2>Ingredients</h2>
            {ingredients.map((ingredient) => (
                <IngredientCard key={ingredient._id} ingredient={ingredient} />
            ))}
        </div>
    );
};

export default IngredientList;
