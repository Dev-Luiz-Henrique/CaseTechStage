import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchData = async (endpoint: string, params = {}) => {
    try {
        const response = await api.get(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar ${endpoint}:`, error);
        throw error;
    }
};
