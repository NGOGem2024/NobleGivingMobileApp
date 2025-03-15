import api from "./apiClient";

// You could extract the baseURL from the api client if needed
const baseURL = api.defaults.baseURL || 'https://noblegivingbackend.azurewebsites.net/';

const EndPoint = {
    // Auth endpoints
    login: 'doner/auth/login',
    signUp: 'doner/auth/signup',
    get_user: 'user/profile',
    get_otp: 'doner/auth/send-doner-otp',  // No need to concatenate with baseURL
    verify_otp: '/verify-otp',
    reset_password: 'doner/auth/reset-pass',
    get_all_ngo: 'getallNgos?',
    ngo_signUp: 'ngo/auth/signup',
    update_ngo_profile: 'update-ngo/?',
};

// API service functions
const apiService = {
  getAllNGOs: async () => {
    try {
      const response = await api.get(EndPoint.get_all_ngo);
      console.log('API Response structure:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.error('Error fetching NGOs:', error);
      throw error;
    }
  }
};

export { EndPoint, baseURL, apiService };