# Security Configuration

## Overview
The `SecurityConfig` class configures Spring Security for the application, managing authentication, authorization, and CORS settings.

## Key Features

### Authentication Configuration
- Disables CSRF for API endpoints
- Configures form-based login with custom success/failure handlers
- Implements JSON responses for login/logout outcomes

### Authorization Rules
```java
.authorizeHttpRequests(auth -> auth
    // Public API endpoints
    .requestMatchers(HttpMethod.GET, "/api/articles/**").permitAll()
    .requestMatchers(HttpMethod.GET, "/api/comments/**").permitAll()
    .requestMatchers("/api/auth/**").permitAll()
    // Admin endpoints require ADMIN role
    .requestMatchers("/api/admin/**").hasRole("ADMIN")
    // All other endpoints require authentication
    .anyRequest().authenticated()
)
```

### CORS Configuration
- Allows requests from:
  - http://localhost:3000
  - http://localhost:5173
  - http://127.0.0.1:5173
- Supports methods: GET, POST, PUT, DELETE, OPTIONS
- Allows all headers
- Enables credentials

### Password Encoding
- Uses BCrypt password encoder for secure password storage

## Technical Implementation

### Login Handler
- Returns JSON response on successful login:
```json
{
    "status": "success",
    "message": "Login successful"
}
```

### Error Handler
- Returns 401 status with JSON response on failure:
```json
{
    "status": "error",
    "message": "Invalid credentials"
}
```

### Logout Configuration
- Custom logout URL at `/api/auth/logout`
- Returns success message in JSON format

## Usage Example

### Protected Endpoint Access
```java
// Requires authentication
GET /api/articles/favorites

// Requires ADMIN role
POST /api/admin/users/manage

// Public access
GET /api/articles/trending
```
