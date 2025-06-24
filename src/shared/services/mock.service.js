// Mock data generator service for testing and demo purposes

class MockService {
  // Generate random user data
  generateUser(overrides = {}) {
    const id = Date.now().toString();
    const firstName = this.getRandomFirstName();
    const lastName = this.getRandomLastName();
    
    return {
      id,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      createdAt: new Date().toISOString(),
      ...overrides
    };
  }

  // Generate multiple users
  generateUsers(count = 10) {
    return Array.from({ length: count }, (_, i) => 
      this.generateUser({ id: (Date.now() + i).toString() })
    );
  }

  // Random name generators
  getRandomFirstName() {
    const firstNames = [
      'John', 'Jane', 'Michael', 'Sarah', 'David', 
      'Emma', 'James', 'Lisa', 'Robert', 'Mary'
    ];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
  }

  getRandomLastName() {
    const lastNames = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones',
      'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'
    ];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  }

  // Generate OTP
  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Simulate API delay
  async delay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Mock API response wrapper
  async mockApiResponse(data, options = {}) {
    const { delay = 500, error = null, errorRate = 0 } = options;
    
    await this.delay(delay);
    
    // Simulate random errors based on errorRate
    if (Math.random() < errorRate) {
      throw new Error(error || 'Mock API error');
    }
    
    return {
      success: true,
      data,
      timestamp: new Date().toISOString()
    };
  }
}

export default new MockService();