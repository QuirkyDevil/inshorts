# Comment Service

## Overview
The `CommentService` class manages comment-related business logic, handling comment creation, retrieval, and deletion with proper authorization checks.

## Features

### Comment Operations
- Retrieve comments by article
- Add new comments
- Delete comments with authorization

### Security Features
- User ownership validation
- Admin override capabilities
- Authorization checks for deletions

## Key Methods

### Comment Retrieval
```java
public List<Comment> getCommentsByArticleId(Long articleId)
```
- Gets all comments for an article
- Ordered by creation date descending
- Used in article detail views

### Comment Creation
```java
public Comment addComment(Long articleId, Long userId, String content)
```
- Creates new comment
- Associates with article and user
- Sets creation timestamp
- Validates entity existence

### Comment Deletion
```java
public void deleteComment(Long commentId, Long userId)
```
- Validates comment ownership
- Allows admin override
- Throws exceptions for unauthorized access

## Technical Implementation

### Dependencies
- CommentRepository
- ArticleRepository
- UserRepository

### Authorization Logic
```java
// Allow deletion if:
// 1. The user is the comment owner
// 2. The user has ADMIN role
boolean isCommentOwner = comment.getUser().getId().equals(userId);
boolean isAdmin = user.getRoles().contains("ADMIN");

if (isCommentOwner || isAdmin) {
    commentRepository.delete(comment);
} else {
    throw new RuntimeException("Not authorized to delete this comment");
}
```

## Usage Examples

### Adding a Comment
```java
Comment comment = commentService.addComment(
    articleId,
    userId,
    "This is a great article!"
);
```

### Deleting a Comment
```java
// Will throw exception if user is not owner or admin
commentService.deleteComment(commentId, userId);
```
