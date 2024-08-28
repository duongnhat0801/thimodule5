import axios from "axios";

const baseURL = 'http://localhost:8080/categories/';

export const getAllCategories = () => {
    return axios.get(baseURL)
        .then(response => response)
        .catch(error => {
            console.error("Error fetching categories:", error);
            throw error; // Re-throw the error for handling in the component
        });
};
