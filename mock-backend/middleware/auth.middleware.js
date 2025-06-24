import { verifyAccessToken } from '../services/jwt.service.js';

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