import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import recipeService from "./recipeService";

const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
const recipe = JSON.parse(localStorage.getItem('recipe')) || {};

const initialState = {
    recipes: recipes || [],
    status: 'idle',
    message: '',
    recipe: recipe || {},
}

export const getAll = createAsyncThunk('recipes/getAll', async () => {
    try {
        return await recipeService.getAll();
    } catch (error) {
        console.error(error);
    }
})
export const getById = createAsyncThunk('recipes/getById', async (_id) => {
    try {
        return await recipeService.getById(_id);
    } catch (error) {
        console.error(error);
    }
})

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.recipes = action.payload;
            })
            .addCase(getAll.rejected, (state, action) => {
                console.error(action.payload)
                state.status = 'failed';
                state.message = action.error
            })
            .addCase(getById.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.recipe = action.payload;
            })
            .addCase(getById.rejected, (state, action) => {
                console.error(action.payload)
                state.status = 'failed';
                state.message = action.error
            })

    }
})
export default recipeSlice.reducer;