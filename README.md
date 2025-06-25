# React Vite JS Template

A modern, production-ready React template with authentication, user management, and a modular architecture. Built with React 19, Vite, and Tailwind CSS.

## ⚠️ Important Disclaimer

**The mock backend is for development and demonstration purposes only. DO NOT use it in a production environment.**

The mock backend:
- Stores data in JSON files
- Has no real security measures
- Is designed for rapid prototyping and development
- Should be replaced with a proper backend API for production use

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/syahiidkamil/react-vite-js-template.git

# Navigate to project directory
cd react-vite-js-template

# Install dependencies
npm install

# Start development servers (frontend + mock backend)
npm run dev
```

### Default Credentials

```
Admin User:
- Email: admin@example.com
- Password: Admin123!

Regular User:
- Email: user@example.com
- Password: User123!
```

### Ports

- Frontend: http://localhost:5180
- Mock Backend: http://localhost:3010

## 📁 Project Structure

```
react-vite-js-template/
├── mock-backend/                 # Mock backend server (development only)
│   ├── server.js                 # Express server configuration
│   ├── routes/                   # API route handlers
│   │   ├── auth.routes.js        # Authentication endpoints
│   │   └── users.routes.js       # User management endpoints
│   ├── middleware/               # Express middleware
│   │   └── auth.middleware.js    # JWT auth & role checking
│   ├── services/                 # Backend services
│   │   └── jwt.service.js        # JWT token management
│   └── data/                     # JSON data storage
│       ├── users.json            # User database
│       └── otps.json             # OTP storage
│
├── src/                          # Frontend source code
│   ├── features/                 # Feature-based modules
│   │   ├── auth/                 # Authentication feature
│   │   │   ├── contexts/         # React contexts
│   │   │   ├── hooks/            # Custom hooks
│   │   │   ├── schemas/          # Validation schemas
│   │   │   ├── services/         # API services
│   │   │   └── *.jsx             # Auth page components
│   │   ├── dashboard/            # Dashboard feature
│   │   ├── users/                # User management feature
│   │   └── not-found/            # 404 page
│   │
│   ├── shared/                   # Shared/common code
│   │   ├── components/           # Reusable components
│   │   │   ├── forms/            # Form components
│   │   │   ├── layouts/          # Layout components
│   │   │   └── ui/               # UI primitives
│   │   ├── constants/            # App constants
│   │   ├── services/             # Shared services
│   │   ├── routes/               # Route components
│   │   └── lib/                  # Utility functions
│   │
│   ├── App.jsx                   # Root component
│   └── index.css                 # Global styles
│
├── public/                       # Static assets
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies & scripts
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS config
├── eslint.config.js              # ESLint configuration
└── README.md                     # This file
```

## 🏗️ Architecture

### Feature-Based Modular Architecture

This template follows a **feature-based modular architecture** where code is organized by feature rather than by type. Each feature is self-contained with its own:

- **Components**: Feature-specific page components
- **Services**: API integration layer
- **Schemas**: Validation schemas (Zod)
- **Hooks**: Feature-specific custom hooks
- **Contexts**: Feature-specific state management

### Shared vs Feature Code

- **`/features`**: Feature-specific code that implements business logic
- **`/shared`**: Reusable code shared across features
  - Components that are used by multiple features
  - Common utilities and helpers
  - Global constants and configurations
  - Base UI components

### Benefits

1. **Scalability**: Easy to add new features without affecting existing ones
2. **Maintainability**: Related code is grouped together
3. **Team Collaboration**: Teams can work on features independently
4. **Code Reusability**: Shared components prevent duplication
5. **Clear Boundaries**: Obvious separation between features

## 📝 Naming Conventions

### Files and Folders

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserEditPage.jsx`, `FormInput.jsx` |
| UI Primitives | lowercase or kebab-case | `button.jsx`, `input-field.jsx` |
| Hooks | camelCase with 'use' prefix | `useAuth.js`, `useForm.js` |
| Services | PascalCase | `AuthService.js`, `UsersService.js` |
| Utilities | camelCase | `utils.js`, `validators.js` |
| Constants | UPPER_SNAKE_CASE | `API_ENDPOINTS`, `USER_ROLES` |
| Schemas | camelCase | `user.schema.js`, `auth.schema.js` |

**Note**: UI primitive components in `/shared/components/ui/` may use lowercase or kebab-case naming (e.g., `button.jsx`, `slot.jsx`). This follows common UI library conventions and distinguishes base UI components from feature components.

### API Endpoints

- Use **plural nouns** for resources: `/api/users`, `/api/products`
- Use **kebab-case** for multi-word resources: `/api/user-profiles`
- Follow RESTful conventions:
  ```
  GET    /api/users         # Get all
  GET    /api/users/:id     # Get one
  POST   /api/users         # Create
  PUT    /api/users/:id     # Update (full)
  PATCH  /api/users/:id     # Update (partial)
  DELETE /api/users/:id     # Delete
  ```

### Code Organization

- One component per file
- Group related components in feature folders
- Keep components small and focused
- Co-locate tests with components (when added)

## 🛠️ Technology Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Routing
- **Tailwind CSS** - Utility-first CSS
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client
- **class-variance-authority** - Component variants
- **lucide-react** - Icons

### Mock Backend

- **Express** - Web framework
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support
- **Cookie Parser** - Cookie handling

### Development Tools

- **ESLint** - Code linting
- **Concurrently** - Run multiple scripts
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## ✨ Features

### Authentication System
- JWT-based authentication with httpOnly cookies
- Login, Register, Logout flows
- Password reset with OTP verification
- Protected routes
- Automatic token refresh

### User Management (Admin Only)
- List all users with pagination
- Create new users
- Edit user details
- Delete users
- Role assignment (Admin/User)

### Role-Based Access Control (RBAC)
- Simple role-based permissions
- Menu visibility based on roles
- API endpoint protection
- Admin-only sections

### Form Handling
- React Hook Form integration
- Zod schema validation
- Reusable form components
- Error handling and display
- Loading states

### UI/UX
- Responsive design
- Clean and modern interface
- Smooth animations
- Loading indicators
- Error boundaries
- Toast notifications (ready to implement)

## 🔐 Authentication & Authorization

### Authentication Flow

1. User logs in with credentials
2. Backend validates and returns JWT tokens
3. Access token stored in httpOnly cookie
4. Refresh token stored in httpOnly cookie
5. Automatic token refresh on 401 responses

### Authorization

- **Regular Users**: Can access dashboard only
- **Admin Users**: Can access dashboard and user management
- Menu items are filtered based on user role
- API endpoints check roles before processing

## 💻 Development Guidelines

### Adding a New Feature

1. Create a new folder under `/src/features/[feature-name]`
2. Add feature-specific components, services, and schemas
3. Create routes in `App.jsx`
4. Add menu items in `DashboardLayout.jsx` (if needed)
5. Implement API endpoints in mock backend (if needed)

### Component Structure

```jsx
// Feature component example
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { FormInput } from '../../shared/components/forms';
import { featureSchema } from './schemas/feature.schema';
import FeatureService from './services/FeatureService';

const FeaturePage = () => {
  // Component logic
  return (
    // JSX
  );
};

export default FeaturePage;
```

### Service Pattern

```javascript
// Service class pattern
class FeatureServiceClass {
  async getItems() {
    const response = await api.get('/items');
    return response.data;
  }
}

const FeatureService = new FeatureServiceClass();
Object.freeze(FeatureService);
export default FeatureService;
```

## 📜 Available Scripts

### Development

```bash
# Start both frontend and backend
npm run dev

# Start frontend only
npm run dev:frontend

# Start backend only
npm run dev:backend
```

### Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint
```

## 🔌 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/auth/logout` | User logout | Yes |
| POST | `/api/auth/refresh` | Refresh access token | Yes |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/auth/forgot-password` | Request password reset | No |
| POST | `/api/auth/verify-otp` | Verify OTP code | No |
| POST | `/api/auth/reset-password` | Reset password | No |

### User Management Endpoints (Admin Only)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Admin |
| POST | `/api/users` | Create new user | Admin |
| PUT | `/api/users/:id` | Update user | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

## 🤝 Contributing

### Code Style

- Use functional components with hooks
- Follow ESLint rules
- Keep components small and focused
- Write meaningful commit messages
- Add JSDoc comments for complex functions

### Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Adding Dependencies

Before adding new dependencies:
1. Check if existing packages can solve the problem
2. Evaluate bundle size impact
3. Ensure it's actively maintained
4. Add only if it provides significant value

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern React best practices
- Inspired by enterprise application patterns
- UI components adapted from shadcn/ui
- Icons from Lucide React

---

**Remember**: This template is a starting point. Customize it based on your specific needs and requirements.