import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../features/recipe/recipeSlice';
import RecipeCard from '../../Recipe/RecipeCard/RecipeCard';
import NewRecipe from '../../Recipe/NewRecipe/NewRecipe'
import ModalHigher from '../../common/Modal/ModalHigher';

const RecipeList = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipe.recipes);

    useEffect(() => {
        dispatch(getAll());
    }, []);

    return (
        <>
            <div className="recipe-list">
                <h2>Recipes</h2>
                <div className="container">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    ))}
                </div>
            </div>
            <ModalHigher>
                <NewRecipe />
            </ModalHigher>
        </>

    );
};

export default RecipeList;
