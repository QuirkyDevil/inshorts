# Article Service

## Overview
The `ArticleService` class manages all article-related business logic, including CRUD operations, view tracking, and article interaction features like likes.

## Features

### Article Management
- Basic CRUD operations
- View count tracking
- Trending articles calculation
- Like/unlike functionality

### Article Retrieval Methods

#### Get All Articles
```java
public List<Article> getAllArticles()
```
- Returns all articles without sorting

#### Get Newest Articles
```java
public List<Article> getAllArticlesByNewest()
```
- Returns articles sorted by publish date
- Most recent first

#### Get Trending Articles
```java
public List<Article> getTrendingArticles()
```
- Returns top 10 articles by trending score
- Score based on views, likes, and comments
- Sorted in descending order

### View Tracking
```java
public Optional<Article> getArticleById(Long id)
```
- Retrieves article by ID
- Automatically increments view count
- Updates article in database

### Article Interactions

#### Like Management
```java
public boolean toggleLike(Long articleId, Long userId)
```
- Toggles user's like status
- Returns true if liked, false if unliked
- Handles relationship on both sides
- Updates article and user entities

#### Like Status Check
```java
public boolean isLikedByUser(Long articleId, Long userId)
```
- Checks if user has liked an article
- Used for UI state management

## Technical Implementation

### Dependencies
- ArticleRepository
- UserRepository

### Article Creation
```java
public Article saveArticle(Article article)
```
- Sets publish date if not provided
- Persists article to database
- Returns saved entity

### Optimization Features
- Efficient like toggling
- View count atomicity
- Trending calculation performance

## Usage Examples

### Creating Article
```java
Article article = new Article();
article.setTitle("Breaking News");
article.setContent("Content here");
Article saved = articleService.saveArticle(article);
```

### Managing Likes
```java
// Toggle like status
boolean isNowLiked = articleService.toggleLike(articleId, userId);

// Check like status
boolean hasLiked = articleService.isLikedByUser(articleId, userId);
```

### View Tracking
```java
// View count automatically incremented
Optional<Article> article = articleService.getArticleById(id);
```
