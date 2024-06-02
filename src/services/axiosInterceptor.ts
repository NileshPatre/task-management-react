import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear the token from local storage
      localStorage.removeItem("jwtToken");
      // Redirect to the sign-in page
      if (window.location.pathname !== "/signIn") {
        window.location.href = "/signIn";
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
