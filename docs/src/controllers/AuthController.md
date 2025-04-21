# Auth Controller

## Overview
The `AuthController` manages authentication and user-related API endpoints, handling user registration, current user information, and authentication status.

## Endpoints

### User Registration
```
POST /api/auth/register
```
- Registers a new user
- **Request Body**: User object with username, email, password
- **Response**: Created user or error message
- **Access**: Public

### Current User Info
```
GET /api/auth/user
```
- Returns current authenticated user's details
- **Response**: User information including roles
- **Access**: Authenticated users
- **Response Format**:
```json
{
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "roles": ["USER"]
}
```

## Technical Implementation

### Dependencies
- UserService for user management
- Spring Security for authentication
- User model for data handling

### Security Features
- Form-based authentication
- JSON responses
- Role-based authorization
- Proper error handling

## Usage Examples

### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
    "username": "newuser",
    "email": "user@example.com",
    "password": "securepass"
}
```

### Get Current User
```http
GET /api/auth/user
Authorization: Bearer token

Response:
{
    "id": 1,
    "username": "newuser",
    "roles": ["USER"]
}
```
