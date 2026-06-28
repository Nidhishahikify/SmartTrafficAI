import axios from "axios";

const API = axios.create({
    baseURL: "https://smarttrafficai.onrender.com"
});

export default API;