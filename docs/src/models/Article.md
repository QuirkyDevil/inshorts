# Article Model

## Overview
The `Article` class represents the core content entity in the Inshorts application. It manages news articles with their metadata, user interactions, and analytics data.

## Properties

### Basic Information
- `id`: Long - Primary key, auto-generated
- `title`: String - Article title
- `summary`: String (500 chars) - Brief article summary
- `content`: String (LOB) - Full article content
- `author`: String - Article author
- `publishedAt`: LocalDateTime - Publication timestamp

### Analytics Fields
- `viewCount`: int - Number of article views
- `trendingScore`: double (transient) - Calculated trending score
- `comments`: Set<Comment> - Collection of user comments
- `likedByUsers`: Set<User> - Users who liked the article

## Entity Relationships

1. **Comments (One-to-Many)**
   - One article can have multiple comments
   - Mapped by 'article' field in Comment entity
   - Cascade type: ALL, orphan removal: true
   - Uses @JsonIdentityInfo for circular reference handling

2. **Liked By Users (Many-to-Many)**
   - Articles can be liked by multiple users
   - Users can like multiple articles
   - Mapped by 'likedArticles' in User entity
   - @JsonIgnore to prevent serialization cycles

## Key Methods

### View Management
```java
public void incrementViewCount() {
    this.viewCount++;
}
```

### Interaction Metrics
```java
public int getLikeCount() {
    return likedByUsers.size();
}

public int getCommentCount() {
    return comments.size();
}
```

## JSON Serialization

- Uses @JsonIdentityInfo for handling bi-directional relationships
- Comments are serialized with IDs for efficient transfer
- User likes are excluded from JSON to prevent circular references
- LOB content is handled appropriately for large text fields

## Usage Example

### Creating a New Article
```java
Article article = new Article();
article.setTitle("Breaking News");
article.setSummary("Quick summary of the news");
article.setContent("Full article content...");
article.setAuthor("John Doe");
article.setPublishedAt(LocalDateTime.now());
```

### Managing Interactions
```java
// Add a comment
article.getComments().add(comment);

// Add a like
article.getLikedByUsers().add(user);

// Get interaction metrics
int likes = article.getLikeCount();
int comments = article.getCommentCount();
```
