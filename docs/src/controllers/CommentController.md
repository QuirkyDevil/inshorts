# Comment Controller

## Overview
The `CommentController` manages comment-related operations in the Inshorts application, handling comment creation, retrieval, and deletion with proper authentication and authorization.

## Endpoints

### Get Comments for Article
```
GET /api/comments/article/{articleId}
```
Retrieves all comments for a specific article.
- **Path Variable**: articleId (Long)
- **Response**: List of Comment objects
- **Access**: Public

### Add Comment
```
POST /api/comments/article/{articleId}
```
Adds a new comment to an article.
- **Path Variable**: articleId (Long)
- **Request Body**:
  ```json
  {
    "content": "Comment text"
  }
  ```
- **Response**: Created Comment object
- **Access**: Authenticated users only
- **Error Responses**:
  - 401: Unauthorized (not logged in)
  - 400: Invalid content

### Delete Comment
```
DELETE /api/comments/{commentId}
```
Deletes a specific comment.
- **Path Variable**: commentId (Long)
- **Access**: Authenticated users (only comment owner)
- **Error Responses**:
  - 401: Unauthorized
  - 403: Forbidden (not comment owner)

## Security Features

### Authentication Handling
```java
if (authentication == null) {
    return ResponseEntity.status(401).build();
}
```
All write operations require authentication.

### Authorization Checks
- Validates user ownership before comment deletion
- Only allows comment authors to delete their own comments
- Uses Spring Security's Authentication object for user identification

## Technical Implementation

### Dependencies
- `CommentService`: Business logic for comment operations
- `UserRepository`: User data access
- `Spring Security`: Authentication and authorization

### Error Handling
- Returns appropriate HTTP status codes for different scenarios
- Provides meaningful error messages in responses
- Implements proper exception handling

## Usage Example

### Adding a Comment
```http
POST /api/comments/article/123
Content-Type: application/json
Authorization: Bearer token

{
    "content": "Great article! Very informative."
}
```

### Response
```json
{
    "id": 456,
    "content": "Great article! Very informative.",
    "createdAt": "2024-04-21T10:30:00",
    "username": "john_doe"
}
```
