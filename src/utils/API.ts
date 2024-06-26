/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import authStore from "../stores/AuthStore";
import authServices from "../services/Auth";
import qs from "qs";

const API = axios.create({
    baseURL: "http://localhost:3000/"
})

API.interceptors.request.use((config) => {
    config.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: "repeat" });
    const accessToken = authStore.getState().accessToken;
    if (accessToken)
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
});

API.interceptors.response.use((response) => {
    return response;
},
    async (error) => {
        const originalRequest = error.config;
        if (error.config && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = authStore.getState().refreshToken;
                if (!refreshToken) {
                    return Promise.reject(error);
                }

                const { data } = await authServices.refreshToken(refreshToken);

                authStore.getState().setTokens(data);
                originalRequest.headers["Authorization"] = `Bearer ${data.access_token}`;

                return API(originalRequest);
            } catch (error) {
                console.log(" error:", error);
                console.error("Failed to refresh tokens");

                authStore.getState().clearTokens();

                return Promise.reject(error);
            }
        }
        
        return Promise.reject(error);
    }

);

export default API;