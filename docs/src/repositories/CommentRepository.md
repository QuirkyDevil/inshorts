# Comment Repository

## Overview
The `CommentRepository` interface extends JpaRepository to manage comment entities, providing methods for retrieving and managing article comments.

## Features

### Default Operations
Inherits standard JPA operations:
- save(Comment entity)
- findById(Long id)
- delete(Comment entity)
- findAll()

### Custom Query Methods

#### Article Comments
```java
List<Comment> findByArticleIdOrderByCreatedAtDesc(Long articleId);
```
- Retrieves comments for a specific article
- Orders comments by creation date (newest first)
- Used in comment listing feature

## Technical Implementation

### Interface Definition
```java
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByArticleIdOrderByCreatedAtDesc(Long articleId);
}
```

### Query Features
- Article-specific comment retrieval
- Automatic sorting by timestamp
- Eager loading of necessary relationships

## Usage Context
- Comment section display
- Comment management
- Article detail views
- User interaction history

## Usage Examples

### Retrieving Article Comments
```java
// Get all comments for an article
List<Comment> comments = commentRepository.findByArticleIdOrderByCreatedAtDesc(articleId);
```

### Comment Management
```java
// Save new comment
Comment savedComment = commentRepository.save(newComment);

// Delete comment
commentRepository.deleteById(commentId);
```
