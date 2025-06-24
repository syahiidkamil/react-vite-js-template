import express from 'express';
import bcrypt from 'bcryptjs';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { adminOnly } from '../middleware/auth.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Database file path
const USERS_DB = join(__dirname, '../data/users.json');

// Mock delay function
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 300));

// Read database
const readDB = async () => {
  try {
    const data = await fs.readFile(USERS_DB, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Write to database
const writeDB = async (data) => {
  await fs.writeFile(USERS_DB, JSON.stringify(data, null, 2));
};

// Get all users (admin only)
router.get('/', adminOnly, async (req, res) => {
  try {
    await mockDelay();
    
    const users = await readDB();
    
    // Remove passwords from response
    // eslint-disable-next-line no-unused-vars
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    
    res.json({ users: usersWithoutPasswords });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single user (admin only)
router.get('/:id', adminOnly, async (req, res) => {
  try {
    await mockDelay();
    
    const { id } = req.params;
    const users = await readDB();
    const user = users.find(u => u.id === id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // eslint-disable-next-line no-unused-vars
    const { password, ...userWithoutPassword } = user;
    
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new user (admin only)
router.post('/', adminOnly, async (req, res) => {
  try {
    await mockDelay();
    
    const { email, password, name, role = 'user' } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, and name are required' });
    }
    
    const users = await readDB();
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      role,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    await writeDB(users);
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user (admin only)
router.put('/:id', adminOnly, async (req, res) => {
  try {
    await mockDelay();
    
    const { id } = req.params;
    const { email, name, role, password } = req.body;
    
    const users = await readDB();
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if email is taken by another user
    if (email && users.find(u => u.email === email && u.id !== id)) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    
    // Update user data
    const updatedUser = { ...users[userIndex] };
    
    if (email) updatedUser.email = email;
    if (name) updatedUser.name = name;
    if (role) updatedUser.role = role;
    if (password) {
      updatedUser.password = await bcrypt.hash(password, 10);
    }
    
    users[userIndex] = updatedUser;
    await writeDB(users);
    
    const { password: _, ...userWithoutPassword } = updatedUser;
    
    res.json({
      message: 'User updated successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user (admin only)
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    await mockDelay();
    
    const { id } = req.params;
    const users = await readDB();
    
    // Prevent self-deletion
    if (id === req.userId) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }
    
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    await writeDB(users);
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;