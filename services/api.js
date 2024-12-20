import axios from 'axios';

const API_BASE_URL = 'https://apifridgechef.koyeb.app';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        setAuthToken(response.data.token);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
};

export const signup = async (fullName, email, password) => {
    try {
        const response = await api.post('/auth/signup', { fullName, email, password });
        setAuthToken(response.data.token);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getRecipes = async (page = 1, limit = 10) => {
    try {
        const response = await api.get(`/recipes?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getRecipesByIngredients = async (ingredients) => {
    try {
        const response = await api.post('/recipes/by-ingredients', ingredients);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const searchRecipes = async (searchTerm) => {
    try {
        const response = await api.get(`/recipes/search?searchTerm=${encodeURIComponent(searchTerm)}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getUserProfile = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateUserProfile = async (userId, profileData) => {
    try {
        const response = await api.put(`/users/${userId}`, profileData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const uploadFridgeImage = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);
        const response = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const addRecipe = async (recipeData) => {
    try {
        const response = await api.post('/recipes', recipeData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateRecipe = async (recipeId, recipeData) => {
    try {
        const response = await api.put(`/recipes/${recipeId}`, recipeData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const rateRecipe = async (recipeId, rating) => {
    try {
        const response = await api.post(`/recipes/${recipeId}/rate`, { rating });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getRecipeById = async (recipeId) => {
    try {
        const response = await api.get(`/recipes/${recipeId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const deleteRecipe = async (recipeId) => {

    try {

        const response = await axios.delete(`${API_BASE_URL}/recipes/${recipeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const followUser = async (userIdToFollow) => {
    try {
        const response = await api.post(`/users/${userIdToFollow}/follow`, {});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const unfollowUser = async (userIdToUnfollow) => {
    try {
        const response = await api.post(`/users/${userIdToUnfollow}/unfollow`, {});
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchUsers = async (page = 1, limit = 10) => {
    try {
        const response = await api.get(`/users?page=${page}&limit=${limit}`);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
