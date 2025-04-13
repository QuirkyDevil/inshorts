# Inshorts Clone - News Aggregation Platform

A modern news aggregation platform inspired by Inshorts, built with Spring Boot and React. This application features article management, user authentication, likes, comments, and trending articles.

## Features

- **Responsive Frontend**: Built with React, TypeScript, and Tailwind CSS
- **User Authentication**: Secure login and registration system
- **Article Management**: Create, read, update, and delete news articles
- **Article Interactions**: Like articles and add comments
- **Trending Algorithm**: Automatically ranks articles based on views, likes, and comments
- **Admin Dashboard**: Manage articles and view analytics

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- MySQL Database
- Maven

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Axios

## Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- npm or pnpm
- Maven 3.6+
- Docker and Docker Compose (for containerized deployment)

## Installation and Setup

### Clone the Repository

```bash
git clone <repository-url>
cd inshorts
```

### Option 1: Local Development Setup

#### Backend Setup

1. Navigate to the project root directory
2. Build the Spring Boot application:

```bash
./mvnw clean install
```

3. Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

The backend server will start at http://localhost:8080

#### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
# Using npm
npm install

# Using pnpm
pnpm install
```

3. Start the development server:

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev
```

The frontend development server will start at http://localhost:5173

### Option 2: Docker Compose Deployment

The easiest way to run the entire application stack (MySQL, Backend, Frontend) is using Docker Compose:

1. Make sure Docker and Docker Compose are installed on your system
2. Navigate to the project root directory
3. Run the following command:

```bash
docker-compose up -d
```

This will:
- Start a MySQL database container
- Build and start the Spring Boot backend container
- Build and start the React frontend container served with Nginx

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:8080/api
- MySQL Database: localhost:3306

To stop all containers:

```bash
docker-compose down
```

To stop all containers and remove volumes (this will delete the database data):

```bash
docker-compose down -v
```

## Database Configuration

### For Local Development

The application is configured to use MySQL. To configure the database connection:

1. Open `src/main/resources/application.properties`
2. Modify the database configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/inshorts
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
```

### For Docker Deployment

The database configuration is already set in the `docker-compose.yml` file with the following credentials:
- Database: inshorts
- Username: inshorts
- Password: inshorts

## Project Structure

- `src/main/java`: Backend Java code
- `src/main/resources`: Backend resources and templates
- `frontend/src`: Frontend React code
  - `components`: Reusable UI components
  - `contexts`: React contexts including authentication
  - `lib`: Utilities and API client
  - `pages`: Page components

## Usage

### User Features

1. **Registration and Login**: Create an account or log in using the login page
2. **Browse Articles**: View all articles, newest articles, or trending articles
3. **Article Interaction**: Like articles and add comments when logged in
4. **Article Details**: View full article content and all comments

### Admin Features

1. **Admin Dashboard**: View analytics and recent articles
2. **Article Management**: Create, edit, and delete articles
3. **User Management**: View and manage user accounts

## Production Deployment

### Standalone JAR Deployment

1. Create a production-ready JAR file:

```bash
./mvnw clean package
```

2. Run the JAR file:

```bash
java -jar target/inshorts-0.0.1-SNAPSHOT.jar
```

### Docker Deployment

For production deployment using Docker:

1. Update the environment variables in docker-compose.yml if needed
2. Deploy using docker-compose:

```bash
docker-compose -f docker-compose.yml up -d
```

3. For scaling the application in production, consider using Docker Swarm or Kubernetes.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Spring Boot](https://spring.io/projects/spring-boot) for the backend framework
- [React](https://reactjs.org/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for frontend tooling
- [Docker](https://www.docker.com/) for containerization
