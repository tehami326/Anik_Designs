import API from "./api";

export const placeOrder = (data) =>
    API.post("/orders", data);
