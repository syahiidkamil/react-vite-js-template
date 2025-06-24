import api from '../../../shared/services/api';

class UsersServiceClass {
  async getUsers() {
    const response = await api.get('/users');
    return response.data;
  }

  async getUser(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  async createUser(userData) {
    const response = await api.post('/users', userData);
    return response.data;
  }

  async updateUser(id, userData) {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  }

  async deleteUser(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
}

// Create singleton instance
const UsersService = new UsersServiceClass();

// Freeze the instance to prevent modifications
Object.freeze(UsersService);

export default UsersService;