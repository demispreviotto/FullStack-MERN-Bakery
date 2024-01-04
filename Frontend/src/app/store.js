import { configureStore } from "@reduxjs/toolkit";
import auth from '../features/auth/authSlice'
import recipe from '../features/recipe/recipeSlice'

export const store = configureStore({
    reducer: {
        auth,
        recipe
    },
})