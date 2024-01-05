import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../features/ingredient/ingredientSlice';
import IngredientCard from '../../Ingredient/IngredientCard/IngredientCard';

const IngredientList = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.ingredient.ingredients);

    useEffect(() => {
        dispatch(getAll());
    }, []);

    return (
        <div className="ingredient-list d-flex h-90 fd-col jc-space">
            <h2>Ingredients</h2>

            <div className="container">
                {ingredients.map((ingredient) => (
                    <IngredientCard key={ingredient._id} ingredient={ingredient} />
                ))}
            </div>
        </div>
    );
};

export default IngredientList;
