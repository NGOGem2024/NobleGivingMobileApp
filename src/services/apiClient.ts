// apiClient.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Create Axios instance
const api = axios.create({
  baseURL: 'https://noblegivingbackend.azurewebsites.net/',  // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers dynamically
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error('Error attaching token:', error);
  }
  return config;
});

export default api;
