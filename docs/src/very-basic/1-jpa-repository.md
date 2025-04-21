# Understanding JPA Repository

## What is JpaRepository?

JpaRepository is an interface provided by Spring Data JPA that provides ready-to-use CRUD operations and additional query methods for your database entities.

### Basic Operations Provided
```java
public interface JpaRepository<T, ID> {
    // Save an entity
    T save(T entity);

    // Find entity by ID
    Optional<T> findById(ID id);

    // Get all entities
    List<T> findAll();

    // Delete an entity
    void delete(T entity);

    // Check if entity exists
    boolean existsById(ID id);

    // Count total entities
    long count();
}
```

## How Are Methods Created at Runtime?

### Method Name Convention
Spring Data JPA creates method implementations automatically based on method names. Here's how it works:

1. **Prefix**: find, read, query, count, get
2. **Property**: By[PropertyName]
3. **Conditions**: And, Or, Between, LessThan, GreaterThan, Like, etc.

### Examples:
```java
// These methods are automatically implemented by Spring Data JPA
public interface UserRepository extends JpaRepository<User, Long> {
    // Becomes: SELECT * FROM users WHERE username = ?
    Optional<User> findByUsername(String username);

    // Becomes: SELECT * FROM users WHERE email = ? AND active = ?
    List<User> findByEmailAndActive(String email, boolean active);

    // Becomes: SELECT * FROM users WHERE age > ?
    List<User> findByAgeGreaterThan(int age);
}
```

## Query Creation Process

1. **Parse Method Name**: Spring parses the method name into its components
2. **Build Query**: Creates a JPQL (Java Persistence Query Language) query
3. **Generate Implementation**: Creates a proxy class with the implementation
4. **Execute**: Runs the query when method is called

## Common Keywords for Method Names

### Conditions
- Is, Equals
- Between
- LessThan, GreaterThan
- Like, NotLike
- StartingWith, EndingWith, Containing
- In, NotIn
- True, False
- IgnoreCase

### Sorting
- OrderBy[Property]Asc
- OrderBy[Property]Desc

### Examples with Generated SQL
```java
// Method: findByLastNameAndAgeGreaterThan
// SQL: SELECT * FROM users WHERE last_name = ? AND age > ?
List<User> findByLastNameAndAgeGreaterThan(String lastName, int age);

// Method: findByEmailContainingOrderByCreatedAtDesc
// SQL: SELECT * FROM users WHERE email LIKE ? ORDER BY created_at DESC
List<User> findByEmailContainingOrderByCreatedAtDesc(String email);
```

## Custom Queries

### Using @Query Annotation
```java
@Query("SELECT a FROM Article a WHERE a.author = ?1")
List<Article> findArticlesByAuthor(String author);

// Native SQL query
@Query(value = "SELECT * FROM articles WHERE view_count > ?1",
       nativeQuery = true)
List<Article> findPopularArticles(int viewCount);
```

## Best Practices

1. **Naming Convention**: Use clear, descriptive method names
2. **Return Types**: Use Optional for single results that might be null
3. **Pagination**: Use Pageable parameter for large results
4. **Performance**: Create specific methods instead of finding all and filtering in memory

### Example with Pagination
```java
public interface ArticleRepository extends JpaRepository<Article, Long> {
    // Returns a Page object with pagination
    Page<Article> findByAuthor(String author, Pageable pageable);
}

// Usage:
PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("createdAt").descending());
Page<Article> articles = repository.findByAuthor("John", pageRequest);
```

## Common Issues and Solutions

### N+1 Query Problem
Problem: Fetching related entities one by one
Solution: Use join fetch in JPQL

```java
@Query("SELECT a FROM Article a JOIN FETCH a.comments")
List<Article> findAllWithComments();
```

### Performance Optimization
- Use projections for partial entity data
- Use native queries for complex operations
- Implement caching for frequently accessed data
