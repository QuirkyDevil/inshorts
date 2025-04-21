# Understanding JPA Entity Relationships

## What are Entity Relationships?
Entity relationships define how different database entities (tables) are connected to each other in a JPA application.

## Types of Relationships

### One-to-One (@OneToOne)
```java
public class User {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private UserProfile profile;
}

public class UserProfile {
    @OneToOne(mappedBy = "profile")
    private User user;
}
```
- One entity is associated with exactly one other entity
- Common use: User and UserProfile
- Uses foreign key in one table

### One-to-Many (@OneToMany)
```java
public class Article {
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private Set<Comment> comments;
}

public class Comment {
    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;
}
```
- One entity can have multiple related entities
- Common use: Article and Comments
- Child table has foreign key

### Many-to-Many (@ManyToMany)
```java
public class User {
    @ManyToMany
    @JoinTable(
        name = "user_articles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "article_id")
    )
    private Set<Article> likedArticles;
}

public class Article {
    @ManyToMany(mappedBy = "likedArticles")
    private Set<User> likedByUsers;
}
```
- Many entities can be associated with many other entities
- Creates junction/join table
- Common use: Users liking Articles

## Cascade Types

### Understanding Cascade Options
```java
@OneToMany(cascade = CascadeType.ALL)         // All operations
@OneToMany(cascade = CascadeType.PERSIST)     // Save operations
@OneToMany(cascade = CascadeType.MERGE)       // Update operations
@OneToMany(cascade = CascadeType.REMOVE)      // Delete operations
@OneToMany(cascade = CascadeType.REFRESH)     // Refresh operations
@OneToMany(cascade = CascadeType.DETACH)      // Detach operations
```

## Fetch Types

### Lazy vs Eager Loading
```java
// Lazy Loading (default for collections)
@OneToMany(fetch = FetchType.LAZY)
private Set<Comment> comments;

// Eager Loading (default for single entities)
@ManyToOne(fetch = FetchType.EAGER)
private Article article;
```

## Best Practices

### 1. Collection Types
```java
// Prefer Set over List for better performance
private Set<Comment> comments = new HashSet<>();

// Use List when order matters
private List<Comment> comments = new ArrayList<>();
```

### 2. Bidirectional Relationships
```java
public class Article {
    @OneToMany(mappedBy = "article")
    private Set<Comment> comments;

    // Helper methods for maintaining both sides
    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setArticle(this);
    }

    public void removeComment(Comment comment) {
        comments.remove(comment);
        comment.setArticle(null);
    }
}
```

### 3. JSON Serialization
```java
public class Article {
    // Prevent infinite recursion in JSON
    @JsonManagedReference
    private Set<Comment> comments;
}

public class Comment {
    @JsonBackReference
    private Article article;
}
```

## Common Issues and Solutions

### 1. N+1 Query Problem
```java
// Problem: Separate query for each comment
@OneToMany(fetch = FetchType.EAGER)
private Set<Comment> comments;

// Solution: Use join fetch in query
@Query("SELECT a FROM Article a LEFT JOIN FETCH a.comments")
List<Article> findAllWithComments();
```

### 2. Circular References
```java
// Problem: Infinite recursion in JSON
// Solution 1: Use @JsonManagedReference and @JsonBackReference
// Solution 2: Use @JsonIgnore
@JsonIgnore
private Set<User> likedByUsers;
```

### 3. Orphan Records
```java
// Remove child records when parent is removed
@OneToMany(mappedBy = "article", orphanRemoval = true)
private Set<Comment> comments;
```

## Database Schema Examples

### One-to-Many Schema
```sql
CREATE TABLE articles (
    id BIGINT PRIMARY KEY,
    title VARCHAR(255)
);

CREATE TABLE comments (
    id BIGINT PRIMARY KEY,
    content TEXT,
    article_id BIGINT,
    FOREIGN KEY (article_id) REFERENCES articles(id)
);
```

### Many-to-Many Schema
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    username VARCHAR(255)
);

CREATE TABLE articles (
    id BIGINT PRIMARY KEY,
    title VARCHAR(255)
);

CREATE TABLE user_articles (
    user_id BIGINT,
    article_id BIGINT,
    PRIMARY KEY (user_id, article_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (article_id) REFERENCES articles(id)
);
```
