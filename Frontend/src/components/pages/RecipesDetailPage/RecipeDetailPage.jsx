import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RecipeDetail from '../../Recipe/RecipeDetail/RecipeDetail';
import { getById } from '../../../features/recipe/recipeSlice';

const RecipeDetailPage = () => {
    const { _id } = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getById(_id))
    }, [])
    const recipe = useSelector((state) => state.recipe.recipe);

    if (!recipe._id) {
        return <div>Loading...</div>;
    }

    return (
        <div className="recipe-detail-page">
            <RecipeDetail recipe={recipe} />
        </div>
    );
};

export default RecipeDetailPage;
