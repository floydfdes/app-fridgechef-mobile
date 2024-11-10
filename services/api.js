import axios from 'axios';

// Simulating API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add this function to set the token after login
export const setAuthToken = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const categories = [
    { id: '1', name: 'Breakfast', key: 'breakfast' },
    { id: '2', name: 'Lunch', key: 'lunch' },
    { id: '3', name: 'Dinner', key: 'dinner' },
    { id: '4', name: 'Desserts', key: 'desserts' },
    { id: '5', name: 'Vegetarian', key: 'vegetarian' },
    { id: '6', name: 'Quick & Easy', key: 'quickAndEasy' },
];

const assignCategory = (recipe) => {
    const categories = {
        breakfast: ['breakfast', 'pancake', 'omelette'],
        lunch: ['salad', 'sandwich'],
        dinner: ['soup', 'steak', 'pasta'],
        desserts: ['cake', 'pie', 'ice cream'],
        vegetarian: ['vegetable', 'vegan']
    };

    const name = recipe.name.toLowerCase();

    for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some(keyword => name.includes(keyword))) {
            return category;
        }
    }

    if (!['chicken', 'beef', 'pork', 'fish'].some(meat => name.includes(meat))) {
        return 'vegetarian';
    }

    return 'quickAndEasy';
};

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        setAuthToken(response.data.token);
        return response.data;
    } catch (error) {
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
        const response = await api.post('/recipes/by-ingredients', { ingredients });
        return response.data.recipes;
    } catch (error) {
        throw error.response.data;
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
