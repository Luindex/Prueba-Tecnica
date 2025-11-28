import axios from "axios";

const API_BASE = "http://10.0.2.2:3000";

const api = axios.create({
    baseURL: API_BASE,
    timeout: 5000,
});

api.interceptors.response.use(undefined, async (err) => {
    const config = err.config;
    if (!config) return Promise.reject(err);
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= 2) return Promise.reject(err);
    config.__retryCount += 1;
    await new Promise(res => setTimeout(res, 500 * config.__retryCount));
    return api(config);
});

export default api;
