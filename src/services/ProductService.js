import axios from "axios";

const baseURL = "http://localhost:8080/products";

export const getAllProducts = (name) => {
    return axios.get(`${baseURL}?_expand=category&name_like=${name}`)
        .then(response => response)
        .catch(error => {
            console.error("Error fetching products:", error);
            throw error; // Re-throw the error for handling in the component
        });
};

export const getProductsByTopPrice = (top) => {
    return axios.get(`${baseURL}?_expand=category&_sort=price&_order=desc&_limit=${top}`)
        .then(response => response)
        .catch(error => {
            console.error("Error fetching products by top price:", error);
            throw error;
        });
};

export const deleteProduct = (productId) => {
    return axios.delete(`${baseURL}/${productId}`)
        .then(response => response)
        .catch(error => {
            console.error("Error deleting product:", error);
            throw error;
        });
};

export const updateProduct = (productId, productData) => {
    return axios.put(`${baseURL}/${productId}`, productData)
        .then(response => response)
        .catch(error => {
            console.error("Error updating product:", error);
            throw error;
        });
};

export const saveProduct = (product) => {
    return axios.post(baseURL, product)
        .then(response => response)
        .catch(error => {
            console.error("Error saving product:", error);
            throw error;
        });
};

export const getProductById = (id) => {
    return axios.get(`${baseURL}/${id}`)
        .then(response => response)
        .catch(error => {
            console.error("Error fetching product by id:", error);
            throw error;
        });
};
