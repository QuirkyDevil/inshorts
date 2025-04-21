# User Service

## Overview
The `UserService` class implements Spring Security's `UserDetailsService` interface and manages user-related operations including authentication, registration, and user management.

## Features

### Authentication
- Implements `UserDetailsService` for Spring Security integration
- Loads user details with role-based authorities
- Password encoding using BCrypt

### User Registration
```java
public User registerUser(User user) {
    // Username/email validation
    // Password encoding
    // Role assignment
    // User persistence
}
```

### Role Management
- Default role: "USER"
- Automatic admin role assignment for admin emails
- Role-based access control integration

## Key Methods

### Authentication
```java
public UserDetails loadUserByUsername(String username)
```
- Loads user from database
- Converts roles to Spring Security authorities
- Returns Spring Security UserDetails object

### User Operations
- `getAllUsers()`: Retrieve all users
- `getUserById(Long id)`: Find user by ID
- `getUserByUsername(String username)`: Find user by username
- `deleteUser(Long id)`: Delete user account

## Technical Implementation

### Dependencies
- UserRepository for data access
- PasswordEncoder for secure password storage
- Spring Security core components

### Security Features
1. Password Handling
   - BCrypt encryption
   - Secure storage
   - No plaintext passwords

2. Role Assignment
```java
// Add default role
user.getRoles().add("USER");

// Admin role for admin emails
if (user.getEmail().contains("admin")) {
    user.getRoles().add("ADMIN");
}
```

### Validation
- Username uniqueness check
- Email uniqueness check
- Proper error handling

## Usage Examples

### User Registration
```java
User user = new User();
user.setUsername("john_doe");
user.setEmail("john@example.com");
user.setPassword("rawPassword");
User registeredUser = userService.registerUser(user);
```

### User Authentication
```java
UserDetails userDetails = userService.loadUserByUsername("john_doe");
// Used by Spring Security for authentication
```
