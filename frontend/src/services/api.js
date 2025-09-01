// src/services/api.js
import axios from "axios";

// Create API instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend URL
});

// Function to set/remove auth token
const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// Export default and named
export default API;
export { API, setAuthToken };






