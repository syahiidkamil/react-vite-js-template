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

// Role permissions (can be extended as needed)
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: {
    canManageUsers: true,
    canViewAllData: true,
    canEditSettings: true,
    canDeleteData: true,
  },
  [USER_ROLES.USER]: {
    canManageUsers: false,
    canViewAllData: false,
    canEditSettings: false,
    canDeleteData: false,
  },
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

// Helper function to check if a role has a specific permission
export const hasPermission = (role, permission) => {
  return ROLE_PERMISSIONS[role]?.[permission] || false;
};

// Helper function to get role display name
export const getRoleDisplayName = (role) => {
  return ROLE_DISPLAY_NAMES[role] || role;
};