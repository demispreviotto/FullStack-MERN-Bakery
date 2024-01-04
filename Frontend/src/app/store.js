import { configureStore } from "@reduxjs/toolkit";
import auth from '../features/auth/authSlice'
import recipe from '../features/recipe/recipeSlice'
import ingredient from '../features/ingredient/ingredientSlice'

export const store = configureStore({
    reducer: {
        auth,
        recipe,
        ingredient,
    },
})