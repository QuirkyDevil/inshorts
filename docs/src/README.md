# Inshorts Clone Project Documentation

This documentation provides detailed information about the backend implementation of the Inshorts Clone project, a news article platform built with Spring Boot.

## Project Structure

The project follows a standard Spring Boot architecture with the following main components:

### Controllers
- `ArticleController`: Handles article-related operations (CRUD, likes)
- `AuthController`: Manages user authentication and registration
- `AdminController`: Provides admin-specific functionalities
- `CommentController`: Manages article comments

### Models
- `User`: User entity with authentication and authorization details
- `Article`: News article entity
- `Comment`: Comment entity for articles

### Configuration
- `SecurityConfig`: Spring Security configuration for authentication and authorization

### Services
- `UserService`: Business logic for user management
- `ArticleService`: Business logic for article operations
- `CommentService`: Business logic for comment management

## Technology Stack
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT Authentication

## API Documentation
See individual controller documentation files for detailed API endpoints and usage.

# Inshorts Application Architecture

## System Overview
The Inshorts application is a full-stack news aggregation platform built with a Spring Boot backend and React frontend. It provides news article management, user interactions, and analytics features.

## Architecture Layers

### Frontend Layer (React + TypeScript)
- Single Page Application (SPA)
- Component-based UI architecture
- Secure authentication integration
- Responsive design with TailwindCSS

### Backend Layer (Spring Boot)
- RESTful API endpoints
- Security with Spring Security
- Thymeleaf templates for admin views
- Scheduled tasks for analytics

### Data Layer
- MySQL database
- JPA/Hibernate ORM
- Optimized queries
- Data integrity constraints

## Key Features

### Content Management
- Article CRUD operations
- Rich text content support
- Media handling
- Draft and publishing workflow

### User Interaction
- Comment system
- Like functionality
- View tracking
- User authentication

### Analytics
- Trending articles calculation
- View count tracking
- User engagement metrics
- Daily reports generation

## Security

### Authentication
- Form-based authentication
- JSON responses
- Session management
- Remember-me functionality

### Authorization
- Role-based access control
- Protected API endpoints
- Secure admin dashboard
- CORS configuration

## Integration Points

### API Communication
- RESTful endpoints
- JSON data format
- Error handling
- Status codes

### Data Flow
1. Frontend API requests
2. Backend controller processing
3. Service layer business logic
4. Repository data access
5. Database operations

## Deployment Architecture

### Container Structure
- Frontend container (Node.js)
- Backend container (JVM)
- Database container (MySQL)
- Docker Compose orchestration

### Scalability
- Stateless application design
- Container-based deployment
- Database optimization
- Caching capabilities

## Development Workflow

### Local Development
1. Backend development (Spring Boot)
2. Frontend development (Vite)
3. Database migrations
4. Integration testing

### Production Deployment
1. Container building
2. Environment configuration
3. Service orchestration
4. Monitoring setup

## Documentation Structure
- /config/: Configuration documentation
- /controllers/: API endpoint documentation
- /models/: Domain model documentation
- /services/: Business logic documentation
- /templates/: View template documentation
- /frontend/: React application documentation
- /deployment/: Deployment guide
