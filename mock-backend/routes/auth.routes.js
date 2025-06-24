import express from 'express';
import bcrypt from 'bcryptjs';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateTokens, verifyRefreshToken, accessTokenCookieOptions, refreshTokenCookieOptions } from '../services/jwt.service.js';
import { authenticate } from '../middleware/auth.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Database file paths
const USERS_DB = join(__dirname, '../data/users.json');
const OTPS_DB = join(__dirname, '../data/otps.json');

// Mock delay function
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// Read database
const readDB = async (dbPath) => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Write to database
const writeDB = async (dbPath, data) => {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
};

// Generate random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    await mockDelay();
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const users = await readDB(USERS_DB);
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const { accessToken, refreshToken } = generateTokens(user.id);
    
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
    
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      message: 'Login successful',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    await mockDelay();
    
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, and name are required' });
    }
    
    const users = await readDB(USERS_DB);
    
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    await writeDB(USERS_DB, users);
    
    const { accessToken, refreshToken } = generateTokens(newUser.id);
    
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      message: 'Registration successful',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logout successful' });
});

// Refresh token endpoint
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }
    
    const decoded = verifyRefreshToken(refreshToken);
    
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    
    const users = await readDB(USERS_DB);
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user.id);
    
    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', newRefreshToken, refreshTokenCookieOptions);
    
    res.json({ message: 'Token refreshed successfully' });
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get current user endpoint
router.get('/me', authenticate, async (req, res) => {
  try {
    const users = await readDB(USERS_DB);
    const user = users.find(u => u.id === req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Forgot password endpoint
router.post('/forgot-password', async (req, res) => {
  try {
    await mockDelay();
    
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    const users = await readDB(USERS_DB);
    const user = users.find(u => u.email === email);
    
    // Always return success to prevent email enumeration
    if (!user) {
      return res.json({ message: 'If the email exists, an OTP has been sent' });
    }
    
    const otp = generateOTP();
    const otps = await readDB(OTPS_DB);
    
    // Remove any existing OTP for this email
    const filteredOtps = otps.filter(o => o.email !== email);
    
    // Add new OTP
    filteredOtps.push({
      email,
      otp,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
    });
    
    await writeDB(OTPS_DB, filteredOtps);
    
    // In production, send email. For mock, log to console
    console.log(`📧 OTP for ${email}: ${otp}`);
    
    res.json({ message: 'If the email exists, an OTP has been sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify OTP endpoint
router.post('/verify-otp', async (req, res) => {
  try {
    await mockDelay();
    
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }
    
    const otps = await readDB(OTPS_DB);
    const otpRecord = otps.find(o => o.email === email && o.otp === otp);
    
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // Check if OTP is expired
    if (new Date(otpRecord.expiresAt) < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }
    
    // Generate a temporary token for password reset
    const resetToken = Math.random().toString(36).substring(2, 15);
    
    // Update OTP record with reset token
    const updatedOtps = otps.map(o => 
      o.email === email ? { ...o, resetToken, verified: true } : o
    );
    await writeDB(OTPS_DB, updatedOtps);
    
    res.json({ 
      message: 'OTP verified successfully',
      resetToken 
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reset password endpoint
router.post('/reset-password', async (req, res) => {
  try {
    await mockDelay();
    
    const { email, resetToken, newPassword } = req.body;
    
    if (!email || !resetToken || !newPassword) {
      return res.status(400).json({ message: 'Email, reset token, and new password are required' });
    }
    
    const otps = await readDB(OTPS_DB);
    const otpRecord = otps.find(o => 
      o.email === email && 
      o.resetToken === resetToken && 
      o.verified === true
    );
    
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid reset token' });
    }
    
    // Check if OTP is expired
    if (new Date(otpRecord.expiresAt) < new Date()) {
      return res.status(400).json({ message: 'Reset token has expired' });
    }
    
    // Update user password
    const users = await readDB(USERS_DB);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const updatedUsers = users.map(u => 
      u.email === email ? { ...u, password: hashedPassword } : u
    );
    await writeDB(USERS_DB, updatedUsers);
    
    // Remove used OTP
    const filteredOtps = otps.filter(o => o.email !== email);
    await writeDB(OTPS_DB, filteredOtps);
    
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;