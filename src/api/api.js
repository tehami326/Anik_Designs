import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((req) => {
    const storedUser = localStorage.getItem("anik_user");

    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user?.token) {
            req.headers.Authorization = `Bearer ${user.token}`;
        }
    }

    return req;
});

export default API;
