# React Vite JS Template

A modern React application template with authentication, built with Vite and featuring a mock backend server.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd react-vite-js-template

# Install dependencies
npm install
```

## Running the Application

```bash
# Start both frontend and backend servers
npm run dev
```

This will start:
- Frontend: http://localhost:5180
- Backend API: http://localhost:3010

## Available Scripts

- `npm run dev` - Start both frontend and backend servers concurrently
- `npm run dev:frontend` - Start only the frontend development server
- `npm run dev:backend` - Start only the mock backend server
- `npm run build` - Build the frontend for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

## Login Credentials

The application comes with 2 pre-configured test users:

| Role    | Email               | Password   |
|---------|---------------------|------------|
| Admin   | admin@example.com   | Admin123!  |
| User    | user@example.com    | User123!   |

## Features

- JWT Authentication with httpOnly cookies
- Complete auth flow (Login, Register, Forgot Password, OTP Verification, Reset Password)
- Protected routes
- Token refresh mechanism
- Mock backend with Express
- Responsive UI with Tailwind CSS
- Modern React with Vite

## Project Structure

```
react-vite-js-template/
├── mock-backend/          # Express mock server
│   ├── data/              # JSON database files
│   ├── middleware/        # Auth middleware
│   ├── routes/            # API routes
│   └── services/          # JWT services
├── src/
│   ├── features/          # Feature-based modules
│   │   ├── auth/          # Authentication pages
│   │   └── not-found/     # 404 page
│   └── shared/            # Shared components and utilities
│       ├── components/    # Reusable components
│       ├── contexts/      # React contexts
│       ├── hooks/         # Custom hooks
│       ├── routes/        # Route components
│       └── services/      # API services
└── package.json
```

## API Endpoints

The mock backend provides the following endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/forgot-password` - Request password reset OTP
- `POST /api/auth/verify-otp` - Verify OTP code
- `POST /api/auth/reset-password` - Reset password with token
