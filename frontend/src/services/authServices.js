import axios from 'axios';

const API_URL = 'https://lyric-orcin.vercel.app/api/auth'; // Adjust the URL as needed

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};