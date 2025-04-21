# Deployment Guide

## Overview
The Inshorts application is containerized using Docker and can be deployed using Docker Compose, which manages both the frontend and backend services.

## Docker Configuration

### Backend Service
```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Frontend Service
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 5173
CMD ["pnpm", "preview"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/inshorts
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://localhost:8080
    depends_on:
      - backend

  db:
    image: mysql:8
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=inshorts
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

## Deployment Steps

### Local Development
```bash
# Build and start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f
```

### Production Deployment
1. Build the application:
   ```bash
   ./mvnw clean package
   ```

2. Configure environment variables:
   - SPRING_PROFILES_ACTIVE
   - Database credentials
   - API URLs
   - Security settings

3. Deploy using Docker Compose:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Monitoring & Maintenance

### Health Checks
- Backend: `/actuator/health`
- Database connectivity
- Frontend service status

### Backup & Recovery
- Database volume backup
- Application logs
- Configuration backup

### Scaling
- Horizontal scaling of frontend
- Load balancer configuration
- Database replication setup
