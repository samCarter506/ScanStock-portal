import axios from "axios";

const Api = axios.create({

    baseURL:"https://scanstockapi.onrender.com/api",
     //baseURL: "http://192.168.0.241:4000/api",
    withCredentials:false
});

Api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("token");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    }
);

export default Api
