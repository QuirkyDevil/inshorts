# User Model

## Overview
The User model represents user entities in the Inshorts application. It manages user authentication, roles, and relationships with articles and comments.

## Properties

- `id`: Long - Primary key, auto-generated
- `username`: String - Unique username for the user
- `email`: String - Unique email address
- `password`: String - Encrypted password (JsonProperty.Access.WRITE_ONLY)
- `roles`: Set<String> - Collection of user roles
- `comments`: Set<Comment> - User's comments on articles
- `likedArticles`: Set<Article> - Articles liked by the user

## Entity Relationships

1. **Comments (One-to-Many)**
   - One user can have multiple comments
   - Mapped by 'user' field in Comment entity
   - Cascade type: ALL

2. **Liked Articles (Many-to-Many)**
   - Users can like multiple articles
   - Articles can be liked by multiple users
   - Junction table: 'article_likes'

## Security Features

- Password is write-only using @JsonProperty
- Uses @JsonIgnore for sensitive relationship fields
- Implements @JsonIdentityInfo for handling circular references

## Database Schema

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE user_roles (
    user_id BIGINT,
    role VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE article_likes (
    user_id BIGINT,
    article_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (article_id) REFERENCES articles(id)
);
