import axios from 'axios';

const axiosClient = axios.create();

const { VITE_APP_API_BASE } = import.meta.env;

const _apiBase = VITE_APP_API_BASE;

// Replace this with our own backend base URL
axiosClient.defaults.baseURL = _apiBase;

// Adding Authorization header for all requests

export default axiosClient;
