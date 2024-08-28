import axios from "axios";

const baseURL = "http://localhost:8080/products";

export const getAllProducts = (name) => {
    return axios.get(`${baseURL}?_expand=category&name_like=${name}`);
}

export const getProductsByTopPrice = (top) => {
    return axios.get(`${baseURL}?_expand=category&_sort=price&_order=desc&_limit=${top}`);
}

export const deleteProduct = (productId) => {
    return axios.delete(baseURL + "/" + productId)
}

export const updateProduct = (productId, productData) => {
    return axios.put(baseURL + "/" + productId, productData);
}

export const saveProduct = (product) => {
    return axios.post(baseURL, product)
}

export const getProductById = (id) => {
    return axios.get(`${baseURL}/${id}`)
}