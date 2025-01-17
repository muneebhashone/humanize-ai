import axios from 'axios';
import Cookies from 'js-cookie';


// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://node.hostingladz.com:1443/api",
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? Cookies.get('token') : null;
    
    // If token exists, add it to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message = error.response?.data?.message || 'Something went wrong';
    
//     // Handle different error status codes
//     switch (error.response?.status) {
//       case 401:
//         // Handle unauthorized
//         toast.error('Session expired. Please login again.');
//         // Redirect to login or handle token refresh
//         break;
//       case 403:
//         toast.error('You do not have permission to perform this action');
//         break;
//       case 404:
//         toast.error('Resource not found');
//         break;
//       case 422:
//         toast.error('Validation failed');
//         break;
//       case 500:
//         toast.error('Server error. Please try again later.');
//         break;
//       default:
//         toast.error(message);
//     }

//     return Promise.reject(error);
//   }
// );

export default api; 