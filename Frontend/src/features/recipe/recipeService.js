import axios from "axios";

const API_URL = 'http://localhost:8080/recipes/'

const getAll = async () => {
    const res = await axios.get(API_URL);
    return res.data;
}
const getById = async (_id) => {
    const res = await axios.get(API_URL + _id);
    return res.data;
}

const recipeService = {
    getAll,
    getById,
}

export default recipeService;