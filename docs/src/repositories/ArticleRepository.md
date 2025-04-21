# Article Repository

## Overview
The `ArticleRepository` interface extends JpaRepository to provide data access operations for Article entities. It includes custom queries for fetching articles based on various criteria and analytics requirements.

## Features

### Default Operations
Being a JpaRepository, it automatically provides:
- Basic CRUD operations
- Pagination support
- Sorting capabilities

### Custom Queries

#### Chronological Article Retrieval
```java
// Get articles ordered by publish date (newest first)
List<Article> findAllByOrderByPublishedAtDesc();

// Get articles published after a specific date
List<Article> findByPublishedAtAfterOrderByPublishedAtDesc(LocalDateTime date);
```

#### Analytics Queries

1. **Most Viewed Articles**
```java
// Retrieve top 10 most viewed articles
List<Article> findTop10ByOrderByViewCountDesc();
```

2. **Most Commented Articles**
```java
@Query("SELECT a FROM Article a LEFT JOIN a.comments c " +
       "GROUP BY a.id ORDER BY COUNT(c.id) DESC")
List<Article> findTopArticlesByCommentCount();
```

3. **Most Liked Articles**
```java
@Query("SELECT a FROM Article a LEFT JOIN a.likedByUsers u " +
       "GROUP BY a.id ORDER BY COUNT(u.id) DESC")
List<Article> findTopArticlesByLikeCount();
```

## Usage Examples

### Basic Operations
```java
// Save a new article
Article savedArticle = articleRepository.save(article);

// Find article by ID
Optional<Article> article = articleRepository.findById(id);

// Delete an article
articleRepository.deleteById(id);
```

### Advanced Queries
```java
// Get recent articles
List<Article> recentArticles = articleRepository.findAllByOrderByPublishedAtDesc();

// Get articles after a date
LocalDateTime lastWeek = LocalDateTime.now().minusWeeks(1);
List<Article> recentArticles = articleRepository
    .findByPublishedAtAfterOrderByPublishedAtDesc(lastWeek);

// Get most popular articles
List<Article> popularArticles = articleRepository.findTop10ByOrderByViewCountDesc();
```

## Technical Details

### Query Implementation
- Uses Spring Data JPA's query derivation for simple queries
- Implements custom JPQL queries for complex analytics
- Optimizes join operations with LEFT JOIN for performance
- Groups results appropriately to avoid duplicate entries

### Performance Considerations
- LEFT JOIN usage ensures articles without comments/likes are included
- Indexing recommendations:
  - Index on publishedAt for chronological queries
  - Index on viewCount for popularity queries
  - Composite indices for relationship tables
