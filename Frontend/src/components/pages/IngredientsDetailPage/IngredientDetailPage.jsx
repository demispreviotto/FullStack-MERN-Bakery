import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IngredientDetail from '../../Ingredient/IngredientDetail/IngredientDetail';
import { getById } from '../../../features/ingredient/ingredientSlice';

const IngredientDetailPage = () => {
    const { _id } = useParams();
    const dispatch = useDispatch()
    const ingredient = useSelector((state) => state.ingredient.ingredient);
    useEffect(() => {
        dispatch(getById(_id))
    }, [])

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
