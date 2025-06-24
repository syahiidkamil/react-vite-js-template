# Mock Backend Data

This directory contains seed data for the mock backend.

## Seed Users

The `users.json` file contains two pre-configured users:

1. **Admin User**
   - Email: `admin@example.com`
   - Password: `Admin123!`
   - Role: admin

2. **Regular User**
   - Email: `user@example.com`
   - Password: `User123!`
   - Role: user

## Important Notes

- These files are tracked in git to provide consistent seed data
- The backend will modify these files during runtime (creating users, storing OTPs, etc.)
- To reset to original seed data, run: `git checkout mock-backend/data/users.json`
- Passwords are hashed using bcrypt with salt rounds of 10

## OTPs

The `otps.json` file stores temporary OTP codes for password reset functionality. This file starts empty and will be populated during runtime.