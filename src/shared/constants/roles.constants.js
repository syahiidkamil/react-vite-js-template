// Role-related constants
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

// Role display names for UI
export const ROLE_DISPLAY_NAMES = {
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.USER]: 'User',
};

// Role colors for UI styling
export const ROLE_COLORS = {
  [USER_ROLES.ADMIN]: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    badge: 'badge-purple',
  },
  [USER_ROLES.USER]: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    badge: 'badge-primary',
  },
};

// Menu items visibility based on roles
export const MENU_ROLE_ACCESS = {
  dashboard: [USER_ROLES.ADMIN, USER_ROLES.USER], // All roles can see dashboard
  users: [USER_ROLES.ADMIN], // Only admin can see users menu
};

// Helper function to check if a role can access a menu item
export const canAccessMenu = (menuKey, userRole) => {
  const allowedRoles = MENU_ROLE_ACCESS[menuKey];
  return allowedRoles ? allowedRoles.includes(userRole) : false;
};

// Helper function to get role display name
export const getRoleDisplayName = (role) => {
  return ROLE_DISPLAY_NAMES[role] || role;
};