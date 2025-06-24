import { verifyAccessToken } from '../services/jwt.service.js';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const USERS_DB = join(__dirname, '../data/users.json');

export const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  const decoded = verifyAccessToken(token);
  
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
  
  req.userId = decoded.userId;
  next();
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (token) {
    const decoded = verifyAccessToken(token);
    if (decoded) {
      req.userId = decoded.userId;
    }
  }
  
  next();
};

// Admin-only middleware
export const adminOnly = async (req, res, next) => {
  try {
    // First authenticate
    const token = req.cookies.accessToken;
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = verifyAccessToken(token);
    
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    
    req.userId = decoded.userId;
    
    // Then check if user is admin
    const data = await fs.readFile(USERS_DB, 'utf-8');
    const users = JSON.parse(data);
    const user = users.find(u => u.id === req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};