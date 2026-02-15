import API from "./api";

export const getProducts = () =>
    API.get("/api/products");

export const getProductById = (id) =>
    API.get(`/api/products/${id}`);
