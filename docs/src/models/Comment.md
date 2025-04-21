# Comment Model

## Overview
The `Comment` class represents user comments on articles in the Inshorts application. It maintains the relationship between users, their comments, and the articles they comment on.

## Properties

### Basic Information
- `id`: Long - Primary key, auto-generated
- `content`: String (500 chars) - Comment text content
- `createdAt`: LocalDateTime - Comment creation timestamp

### Relationships
- `user`: User - The user who created the comment
- `article`: Article - The article being commented on

### JSON Handling
- `username`: String (Transient) - Username for JSON serialization

## Entity Relationships

1. **User (Many-to-One)**
   - Many comments can belong to one user
   - Non-nullable foreign key: user_id
   - Required relationship

2. **Article (Many-to-One)**
   - Many comments can belong to one article
   - Non-nullable foreign key: article_id
   - @JsonIgnore to prevent circular references
   - Required relationship

## JSON Serialization

### Included Fields
- Comment ID
- Content
- Creation timestamp
- Username (derived from user relationship)
- User ID (via helper method)

### Excluded Fields
- Article reference (prevented circular references)
- Full user object (only username exposed)

## Usage Example

### Creating a New Comment
```java
Comment comment = new Comment();
comment.setContent("Great article!");
comment.setCreatedAt(LocalDateTime.now());
comment.setUser(currentUser);
comment.setArticle(targetArticle);
```

### Accessing Comment Data
```java
// Get comment author's username
String username = comment.getUsername();

// Get comment author's ID
Long userId = comment.getUserId();
```

## Database Schema
```sql
CREATE TABLE comments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(500) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    user_id BIGINT NOT NULL,
    article_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (article_id) REFERENCES articles(id)
);
```
