# User Repository

## Overview
The `UserRepository` interface extends JpaRepository to provide database operations for User entities, with custom methods for user lookup and validation.

## Features

### Default Operations
Inherits standard JPA operations:
- save(User entity)
- findById(Long id)
- findAll()
- delete(User entity)

### Custom Query Methods

#### Username Operations
```java
Optional<User> findByUsername(String username);
boolean existsByUsername(String username);
```
- Used for user lookup during authentication
- Username uniqueness validation during registration

#### Email Operations
```java
Optional<User> findByEmail(String email);
boolean existsByEmail(String email);
```
- Email uniqueness validation
- User lookup by email address

## Technical Implementation

### Interface Definition
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
```

### Usage Context
- Authentication process
- User registration validation
- User profile management
- Admin user management

## Usage Examples

### User Lookup
```java
// Find user by username
Optional<User> user = userRepository.findByUsername("john_doe");

// Check if username exists
boolean exists = userRepository.existsByUsername("john_doe");
```

### Email Validation
```java
// Check if email is available
boolean emailTaken = userRepository.existsByEmail("john@example.com");
```
