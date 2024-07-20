
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://b2ba-213-230-116-198.ngrok-free.app/api',
  headers: {
    'ngrok-skip-browser-warning': 'true',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  }
});

export default apiClient;
