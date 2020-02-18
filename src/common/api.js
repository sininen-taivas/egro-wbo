import axios from "axios";
import { KS_SERVER, KS_APIKEY } from "./const";

const instance = axios.create({
    // baseURL: process.env.VUE_APP_API_URL,
    headers: {
        // "Cache-Control": "no-cache, no-store, must-revalidate"
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        // 'Accept': 'application/json',
        // 'Content-Type': 'text/plain',
    }
    // timeout: 30000
});

instance.interceptors.request.use(async config => {
    const server = localStorage.getItem(KS_SERVER);
    config.baseURL = server || '/';
    if (!config.headers['api_key']) {
        const api_key = localStorage.getItem(KS_APIKEY);
        if (api_key) config.headers['api_key'] = api_key;
    }
    return config;
}, error => Promise.reject(error));

export default instance;