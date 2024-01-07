import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../features/ingredient/ingredientSlice';
import IngredientCard from '../../Ingredient/IngredientCard/IngredientCard';
import NewIngredient from '../../Ingredient/NewIngredient/NewIngredient';
import ModalHigher from '../../common/Modal/ModalHigher';

const IngredientList = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.ingredient.ingredients);

    useEffect(() => {
        dispatch(getAll());
    }, []);

    return (
        <>
            <h2>Ingredients</h2>
            <div className="ingredient-list">
                <div className="container">
                    {ingredients.map((ingredient) => (
                        <IngredientCard key={ingredient._id} ingredient={ingredient} />
                    ))}
                </div>
            </div>
            <ModalHigher>
                <NewIngredient />
            </ModalHigher>

        </>
    );
};

export default IngredientList;