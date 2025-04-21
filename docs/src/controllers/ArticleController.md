# Article Controller

## Overview
The `ArticleController` handles all article-related REST endpoints, providing APIs for article management and interaction.

## Endpoints

### Article Retrieval

#### Get All Articles
```
GET /api/articles
```
- Returns all articles
- **Response**: List of Article objects
- **Access**: Public

#### Get Newest Articles
```
GET /api/articles/newest
```
- Returns articles sorted by publish date
- **Response**: List of Article objects
- **Access**: Public

#### Get Trending Articles
```
GET /api/articles/trending
```
- Returns top trending articles
- **Response**: List of Article objects, sorted by trending score
- **Access**: Public

#### Get Single Article
```
GET /api/articles/{id}
```
- Returns article by ID
- Increments view count
- **Response**: Article object
- **Access**: Public

### Article Management

#### Create Article
```
POST /api/articles
```
- Creates new article
- **Request Body**: Article object
- **Access**: Authenticated users
- **Response**: Created article

#### Update Article
```
PUT /api/articles/{id}
```
- Updates existing article
- **Request Body**: Article object
- **Access**: Authenticated users
- **Response**: Updated article

#### Delete Article
```
DELETE /api/articles/{id}
```
- Deletes article
- **Access**: Authenticated users
- **Response**: 204 No Content

### Article Interactions

#### Toggle Like
```
POST /api/articles/{id}/like
```
- Toggles user's like status for article
- **Access**: Authenticated users
- **Response**: Updated like status

## Technical Implementation

### Dependencies
- ArticleService for business logic
- UserRepository for user data
- Spring Security for authentication

### Authentication Integration
- Uses Spring Security's Authentication object
- Role-based access control
- User context for likes

## Usage Examples

### Creating Article
```http
POST /api/articles
Content-Type: application/json
Authorization: Bearer token

{
    "title": "Breaking News",
    "summary": "Quick summary",
    "content": "Full article content",
    "author": "John Doe"
}
```

### Toggling Like
```http
POST /api/articles/123/like
Authorization: Bearer token

Response:
{
    "liked": true
}
```
