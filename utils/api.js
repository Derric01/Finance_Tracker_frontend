import axios from "axios";

// Determine the API URL based on environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Add a request interceptor to include the token in each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || !error.response) {
      console.error('Backend server is not available. Please make sure the backend is running on port 5000.');
      return Promise.reject({
        ...error,
        message: 'Backend server is not available. Please make sure the backend is running.',
        isNetworkError: true
      });
    }
    
    // Log validation errors for debugging
    if (error.response && error.response.data && error.response.data.errors) {
      console.error('Validation errors:', error.response.data.errors);
    }
    
    // Handle other errors
    return Promise.reject(error);
  }
);

export default api;
