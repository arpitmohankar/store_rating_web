import axios from 'axios';

const API_URL = 'http://localhost:5000/api';
const api = axios.create({baseURL: API_URL,
    headers: {'Content-Type': 'application/json'}
});
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
export const authAPI = {
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data),
    changePassword: (data) => api.post('/auth/change-password', data)
};

export const userAPI = {
    getAllUsers: () => api.get('/users'),
    getProfile: () => api.get('/users/profile'),
    createUser: (data) => api.post('/users/create', data),
    getUserById: (id) => api.get(`/users/${id}`)
};
export const storeAPI = {
    getAllStores: () => api.get('/stores'),
    getStoreById: (id) => api.get(`/stores/${id}`),
    createStore: (data) => api.post('/stores/create', data),
    getMyStore: () => api.get('/stores/my/store')
};
export const ratingAPI = {
    submitRating: (data) => api.post('/ratings/submit', data),
    getUserRating: (storeId) => api.get(`/ratings/user/${storeId}`),
    getStoreRatings: (storeId) => api.get(`/ratings/store/${storeId}`)
};
export const dashboardAPI = {
    getAdminDashboard: () => api.get('/dashboard/admin'),
    getUserDashboard: () => api.get('/dashboard/user'),
    getStoreOwnerDashboard: () => api.get('/dashboard/store-owner')
};


export default api;
