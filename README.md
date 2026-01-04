# OJT System — Frontend

This is the React + TypeScript frontend for the OJT system. It uses Tailwind CSS and communicates with the backend API under `/api`.

Prerequisites
- Node.js 18+ and pnpm (preferred). If you don't have `pnpm` installed:
   ```bash
   npm install -g pnpm
   ```

Quick start
1. Install dependencies:
   ```bash
   cd frontend
   pnpm install
   ```
2. Create `.env.local` (if needed) and set API base URL or other env vars (the project may use `REACT_APP_API_URL` or similar in constants).
3. Run the dev server:
   ```bash
   pnpm start
   ```
4. Build for production:
   ```bash
   pnpm build
   ```

Notes
- `.env.local` is ignored by `.gitignore` to avoid leaking secrets.
- The registration page is at `/register` (see `src/pages/StudentRegister.tsx`). The frontend posts registration data to `/students/register` via the API client.

Developer checks
- Type checking (TypeScript):

   ```bash
   # runs the TypeScript compiler without emitting files
   cd frontend
   pnpm exec tsc --noEmit
   ```

- Linting (optional — install ESLint first):

   ```bash
   # install ESLint and TypeScript plugin (one-time)
   cd frontend
   pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

   # run lint (adjust glob to your src folder)
   pnpm exec eslint "src/**/*.{ts,tsx}" --ext .ts,.tsx

   # auto-fix simple issues
   pnpm exec eslint "src/**/*.{ts,tsx}" --ext .ts,.tsx --fix
   ```

- Build (production):

   ```bash
   cd frontend
   pnpm build
   ```
# OJT Management System - Frontend

React + TypeScript frontend with Tailwind CSS for the OJT Management System.

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
- Tailwind CSS 3.x
- React Router DOM 6.x
- Axios
- Lucide React

## Project Structure

```
src/
├── components/        # Reusable components
│   └── Layout.tsx    # Main layout with sidebar
├── pages/            # Page components
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── Students.tsx
│   ├── Announcements.tsx
│   ├── TimeLogs.tsx
│   └── Submissions.tsx
├── services/         # API services
│   ├── api.ts       # Axios instance & interceptors
│   ├── auth.service.ts
│   └── student.service.ts
├── App.tsx          # Route definitions
├── index.tsx        # App entry point
└── index.css        # Tailwind imports & custom styles
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your backend URL
REACT_APP_API_URL=http://localhost:3000/api
```

### Development

```bash
# Start development server (port 3001)
pnpm start

# Build for production
pnpm build

# Run tests
pnpm test
```

## Responsive Design

The application is fully responsive with breakpoints:

- **xs**: 475px (extra small devices)
- **sm**: 640px (small devices)
- **md**: 768px (tablets)
- **lg**: 1024px (desktops)
- **xl**: 1280px (large desktops)
- **2xl**: 1536px (extra large screens)

### Mobile Features

- Collapsible sidebar with backdrop
- Touch-friendly navigation
- Card-based layouts for tables
- Optimized typography and spacing
- Responsive grid systems

### Desktop Features

- Persistent sidebar navigation
- Table-based data views
- Multi-column layouts
- Hover states and tooltips

## Tailwind Configuration

Custom theme extensions in `tailwind.config.js`:

- **Primary color palette** - Blue-based theme
- **Custom scrollbar** - Thin, styled scrollbar
- **Fade-in animation** - Smooth entrance animations
- **Extra small breakpoint** - 475px for phones

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

## Environment Variables

- `REACT_APP_API_URL` - Backend API base URL

## Color Scheme

Primary colors (customizable in `tailwind.config.js`):

- **50-100**: Light backgrounds
- **500-600**: Main action colors
- **700-900**: Hover states, dark mode

## Scripts

- `pnpm start` - Start dev server
- `pnpm build` - Production build
- `pnpm test` - Run tests
- `pnpm eject` - Eject from CRA (use with caution)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Production Build

```bash
# Create optimized production build
pnpm build

# Output: build/ directory
# Deploy build/ to any static hosting (Netlify, Vercel, S3, etc.)
```

## Docker Support

Build frontend Docker image:

```bash
docker build -t ojt-frontend .
docker run -p 80:80 ojt-frontend
```

## Contributing

1. Follow TypeScript strict mode
2. Use Tailwind utility classes (avoid custom CSS)
3. Ensure mobile responsiveness
4. Add proper TypeScript types
5. Test on multiple screen sizes

## License

MIT
