import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'http://localhost:3056'

export default axiosInstance;