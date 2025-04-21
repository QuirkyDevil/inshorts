# Frontend Integration

## Overview
The frontend is built with React, TypeScript, and Vite, providing a modern single-page application (SPA) interface for the Inshorts application.

## Technology Stack

### Core Technologies
- React 18 for UI components
- TypeScript for type safety
- Vite for development and building
- TailwindCSS for styling

### Key Dependencies
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "^1.x"
  }
}
```

## Project Structure

### Components
- **layouts/**: Page layout components
  - AdminLayout: Dashboard structure
  - MainLayout: Public page structure

- **ui/**: Reusable UI components
  - ArticleCard: Article display component
  - CommentSection: Article comments handling

### Pages
- AdminArticlesPage: Article management
- AdminDashboardPage: Analytics dashboard
- ArticleDetailPage: Single article view
- HomePage: Main landing page
- LoginPage/RegisterPage: Authentication

### Context
- AuthContext: Authentication state management
- User session handling
- Protected route implementation

### API Integration
- Axios instance configuration
- API endpoint definitions
- Error handling middleware
- Authentication header management

## Development

### Running the Frontend
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Environment Configuration
```env
VITE_API_URL=http://localhost:8080
VITE_API_TIMEOUT=5000
```

## Features

### Responsive Design
- Mobile-first approach
- Tailwind breakpoints
- Flexible layouts

### State Management
- React Context for global state
- Local state for component data
- Form state handling

### Authentication Flow
- Login/Register forms
- Token management
- Protected routes
- Role-based access
