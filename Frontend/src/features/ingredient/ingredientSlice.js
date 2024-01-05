import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ingredientService from "./ingredientService";

const ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];
const ingredient = JSON.parse(localStorage.getItem('ingredient')) || {};

const initialState = {
    ingredients: ingredients || [],
    status: 'idle',
    message: '',
    ingredient: ingredient || {},
}

export const getAll = createAsyncThunk('ingredients/getAll', async () => {
    try {
        return await ingredientService.getAll();
    } catch (error) {
        console.error(error);
    }
})
export const getById = createAsyncThunk('ingredients/getById', async (_id) => {
    try {
        return await ingredientService.getById(_id);
    } catch (error) {
        console.error(error);
    }
})

export const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAll.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ingredients = action.payload;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.status = 'failed'
                state.message = action.error;
            })
            .addCase(getById.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getById.rejected, (state, action) => {
                state.status = 'failed'
                state.message = action.error;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                console.log(state, action)
                state.ingredient = action.payload
            })
    }
})
export default ingredientSlice.reducer