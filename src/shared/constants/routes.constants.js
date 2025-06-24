// Route paths constants
export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_OTP: '/verify-otp',
  RESET_PASSWORD: '/reset-password',
  
  // Dashboard routes
  DASHBOARD: '/dashboard',
  HOME: '/',
  
  // User management routes
  USERS: '/users',
  USER_CREATE: '/users/new',
  USER_DETAIL: '/users/:id',
  USER_EDIT: '/users/:id/edit',
  
  // Dynamic route helpers
  getUserDetail: (id) => `/users/${id}`,
  getUserEdit: (id) => `/users/${id}/edit`,
};

// Route groups for permission checking
export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.VERIFY_OTP,
  ROUTES.RESET_PASSWORD,
];

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.USERS,
  ROUTES.USER_CREATE,
];