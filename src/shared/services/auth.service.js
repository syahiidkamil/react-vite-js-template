import api from './api';

class AuthService {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  }

  async register(email, password, name) {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  }

  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  }

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data.user;
  }

  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  }

  async verifyOtp(email, otp) {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
  }

  async resetPassword(email, resetToken, newPassword) {
    const response = await api.post('/auth/reset-password', { 
      email, 
      resetToken, 
      newPassword 
    });
    return response.data;
  }

  async refreshToken() {
    const response = await api.post('/auth/refresh');
    return response.data;
  }
}

export default new AuthService();