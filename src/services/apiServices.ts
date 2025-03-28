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


    // NGO auth
    ngo_signUp: 'ngo/auth/signup',
    update_ngo_profile: 'update-ngo/?',
    ngo_signup_verify_email: 'ngo/auth/signup/verify-email',
    ngo_signup_verify_otp: 'ngo/auth/signup/verify-otp',
    ngo_login: 'ngo/auth/login',
    ngo_login_resend_otp: 'ngo/auth/login/resend-otp',
    ngo_login_verify_otp: 'ngo/auth/login/verify-otp',
    ngo_reset_password: 'ngo/auth/login/reset-pass',
    ngo_upload_image: 'ngo/upload-img',
    ngo_get_image: 'ngo/get-images/',
    ngo_update_profile: 'update-ngo/',
    ngo_get_sas_url: 'ngo/get-sas-url',
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
  },
  
  getNGOById: async (ngoId: string) => {
    try {
      // First fetch all NGOs
      const response = await api.get(EndPoint.get_all_ngo);
      
      // Find the specific NGO by ID
      if (response.data && response.data.ngos && Array.isArray(response.data.ngos)) {
        const ngo = response.data.ngos.find((ngo: any) => ngo._id === ngoId || ngo.ngo_id === ngoId);
        
        if (ngo) {
          return ngo;
        } else {
          throw new Error('NGO not found');
        }
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching NGO by ID:', error);
      throw error;
    }
  }
};

export { EndPoint, baseURL, apiService };