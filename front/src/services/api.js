import axios from "axios";

const urlBack = "mongodb://localhost:27017/"

const api = axios.create({
    baseURL: urlBack,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;