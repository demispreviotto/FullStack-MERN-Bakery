import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../../features/recipe/recipeSlice';
import RecipeCard from '../../Recipe/RecipeCard/RecipeCard';
import Modal from '../../common/Modal/Modal'
import NewItemButton from '../../common/NewItemButton/NewItemButton'
import NewRecipe from '../../Recipe/NewRecipe/NewRecipe'

const RecipeList = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipe.recipes);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getAll());
    }, []);
    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <>
            <div className="recipe-list d-flex h-90 fd-col jc-space">
                <h2>Recipes</h2>
                <div className="container">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe._id} recipe={recipe} />
                    ))}
                </div>
                <NewItemButton toggleModal={toggleModal} />
                <Modal isOpen={modalOpen} onClose={toggleModal}>
                    <NewRecipe toggleModal={toggleModal} />
                </Modal>
            </div>
        </>

    );
};

export default RecipeList;
