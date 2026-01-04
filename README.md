# OJT System — Frontend

This is the React + TypeScript frontend for the OJT system. It uses Tailwind CSS and communicates with the backend API under `/api`.

## Prerequisites

- Node.js 18+ and pnpm (preferred). If you don't have `pnpm` installed:
  ```bash
  npm install -g pnpm
  ```

## Quick Start

1. Install dependencies:
   ```bash
   cd frontend
   pnpm install
   ```
2. Create `.env.local` (copy from `.env.local.example`) and set API base URL:
   ```bash
   cp .env.local.example .env.local
   ```
3. Run the dev server:
   ```bash
   pnpm start
   ```
4. Build for production:
   ```bash
   pnpm build
   ```

## Features

- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Fully Responsive** - Mobile-first design approach
- 🎯 **TypeScript** - Type-safe development
- 🔐 **Authentication** - JWT-based auth with protected routes
- 🧭 **React Router** - Client-side routing
- ⚡ **Axios** - HTTP client with interceptors
- 🎭 **Lucide Icons** - Beautiful, consistent icon set

## Tech Stack

- React 18.2
- TypeScript 5.0
- Tailwind CSS 4.x
- React Router DOM 7.x
- Axios
- Lucide React

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── Layout.tsx     # Main layout with sidebar
│   └── ProtectedRoute.tsx
├── composables/       # Custom hooks
│   ├── useAuthComposable.ts
│   └── useFetch.ts
├── constants/         # App constants
│   ├── api.ts
│   └── messages.ts
├── contexts/          # React contexts
│   └── AuthContext.tsx
├── dtos/              # Data Transfer Objects
├── interfaces/        # TypeScript interfaces
├── pages/             # Page components
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── StudentRegister.tsx
│   ├── Students.tsx
│   ├── Announcements.tsx
│   ├── TimeLogs.tsx
│   └── Submissions.tsx
├── services/          # API services
│   ├── api.ts         # Axios instance & interceptors
│   ├── auth.service.ts
│   ├── student.service.ts
│   ├── submission.service.ts
│   └── timelog.service.ts
├── App.tsx            # Route definitions
├── index.tsx          # App entry point
└── index.css          # Tailwind imports & custom styles
```

## Developer Workflow

### Code Quality Tools

This project uses **Husky** + **lint-staged** to automatically run checks on every commit:

| Tool | Purpose |
|------|---------|
| **ESLint** | Linting & code quality |
| **Prettier** | Code formatting |
| **Husky** | Git hooks |
| **lint-staged** | Run linters on staged files only |

### Pre-commit Hook

When you run `git commit`, the following happens automatically:
1. **ESLint** checks and auto-fixes staged `.ts`, `.tsx`, `.js`, `.jsx` files
2. **Prettier** formats staged files

### Available Scripts

```bash
# Development
pnpm start          # Start dev server (port 3000)

# Production
pnpm build          # Build for production

# Code Quality
pnpm lint           # Run ESLint on src/
pnpm format         # Format all files with Prettier
pnpm typecheck      # Run TypeScript compiler (no emit)

# Testing
pnpm test           # Run tests
```

### Manual Checks

```bash
# Type checking
pnpm typecheck

# Lint all files
pnpm lint

# Format all files
pnpm format

# Full check before pushing
pnpm typecheck && pnpm lint && pnpm build
```

## Configuration Files

| File | Purpose |
|------|---------|
| `eslint.config.js` | ESLint 9.x flat config |
| `.prettierrc` | Prettier formatting rules |
| `.prettierignore` | Files to skip formatting |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.js` | Tailwind CSS configuration |
| `.husky/pre-commit` | Pre-commit hook script |

## Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:3000/api` |

## API Integration

All API calls use the centralized `apiClient` from `services/api.ts`:

- Automatic JWT token attachment
- Global error handling
- Auto-redirect on 401 (Unauthorized)
- Base URL configuration via environment variable

### Example Usage

```typescript
import { studentService } from './services/student.service';

// Get all students
const students = await studentService.getAll();

// Create student
await studentService.create({ name: 'John Doe', ... });
```

## Authentication Flow

1. User logs in via `/login` page
2. JWT token stored in localStorage
3. Token automatically added to all API requests
4. On 401 error, user redirected to login
5. Protected routes check token presence

## Responsive Design

The application is fully responsive with breakpoints:

- **sm**: 640px (small devices)
- **md**: 768px (tablets)
- **lg**: 1024px (desktops)
- **xl**: 1280px (large desktops)
- **2xl**: 1536px (extra large screens)

## Production Build

```bash
# Create optimized production build
pnpm build

# Output: build/ directory
# Deploy build/ to any static hosting (Netlify, Vercel, S3, etc.)
```

## Notes

- `.env.local` is ignored by `.gitignore` to avoid leaking secrets.
- The registration page is at `/register` (see `src/pages/StudentRegister.tsx`).
- ESLint uses the new flat config format (ESLint 9.x).

## License

MIT
