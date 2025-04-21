# Inshorts Application Documentation

## Table of Contents

### Overview
- [System Architecture](src/README.md)
- [Getting Started](../HELP.md)

### Backend
1. Configuration
   - [Security Configuration](src/config/SecurityConfig.md)
   - [Web Configuration](src/config/WebConfig.md)

2. Domain Models
   - [User Model](src/models/User.md)
   - [Article Model](src/models/Article.md)
   - [Comment Model](src/models/Comment.md)

3. Controllers
   - [Admin Controller](src/controllers/AdminController.md)
   - [Comment Controller](src/controllers/CommentController.md)

4. Services
   - [Analytics Service](src/services/AnalyticsService.md)

5. Repositories
   - [Article Repository](src/repositories/ArticleRepository.md)

### Frontend
- [Frontend Overview](src/frontend/README.md)
- [Templates Guide](src/templates/README.md)

### Deployment
- [Deployment Guide](src/deployment/README.md)

## Quick Start

### Development Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   ./mvnw install

   # Frontend
   cd frontend
   pnpm install
   ```

3. Start development servers:
   ```bash
   # Backend
   ./mvnw spring-boot:run

   # Frontend
   cd frontend
   pnpm dev
   ```

### Docker Deployment
```bash
docker-compose up --build
```

## Contributing
See [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Support
For support, please open an issue in the repository or contact the development team.
