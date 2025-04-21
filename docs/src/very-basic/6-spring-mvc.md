# Understanding Spring MVC

## What is Spring MVC?
Spring MVC is a web framework built on the Servlet API, providing Model-View-Controller architecture for building web applications and RESTful services.

## Core Components

### Controllers
```java
@Controller  // Traditional web controller
public class AdminController {
    @GetMapping("/admin")
    public String dashboard(Model model) {
        model.addAttribute("articles", articles);
        return "dashboard";  // Returns view name
    }
}

@RestController  // RESTful API controller
public class ArticleController {
    @GetMapping("/api/articles")
    public List<Article> getArticles() {
        return articles;  // Returns data directly as JSON
    }
}
```

### Models
```java
// Data model
public class Article {
    private Long id;
    private String title;
    private String content;
}

// View model (DTO)
public class ArticleDTO {
    private String title;
    private String summary;
    private int likeCount;
}
```

### Views (Thymeleaf)
```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>Dashboard</title>
</head>
<body>
    <div th:each="article : ${articles}">
        <h2 th:text="${article.title}">Title</h2>
        <p th:text="${article.content}">Content</p>
    </div>
</body>
</html>
```

## Request Handling

### Request Mappings
```java
@GetMapping("/articles")          // GET request
@PostMapping("/articles")         // POST request
@PutMapping("/articles/{id}")     // PUT request
@DeleteMapping("/articles/{id}")  // DELETE request
@PatchMapping("/articles/{id}")   // PATCH request
```

### Path Variables & Parameters
```java
// Path variable
@GetMapping("/articles/{id}")
public Article getArticle(@PathVariable Long id) {
    return articleService.findById(id);
}

// Query parameter
@GetMapping("/articles")
public List<Article> searchArticles(
    @RequestParam(required = false) String keyword,
    @RequestParam(defaultValue = "0") int page
) {
    return articleService.search(keyword, page);
}
```

### Request Body
```java
@PostMapping("/articles")
public Article createArticle(@RequestBody Article article) {
    return articleService.save(article);
}

// With validation
@PostMapping("/articles")
public Article createArticle(
    @Valid @RequestBody Article article,
    BindingResult result
) {
    if (result.hasErrors()) {
        throw new ValidationException("Invalid article data");
    }
    return articleService.save(article);
}
```

## Response Handling

### ResponseEntity
```java
@GetMapping("/{id}")
public ResponseEntity<Article> getArticle(@PathVariable Long id) {
    return articleService.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
}

@PostMapping
public ResponseEntity<Article> createArticle(@RequestBody Article article) {
    Article saved = articleService.save(article);
    URI location = ServletUriComponentsBuilder
        .fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(saved.getId())
        .toUri();
    return ResponseEntity.created(location).body(saved);
}
```

### Error Handling
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(ex.getMessage()));
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<?> handleValidation(ValidationException ex) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(new ErrorResponse(ex.getMessage()));
    }
}
```

## Model Attributes

### Adding to Model
```java
@Controller
public class ArticleController {
    @GetMapping("/articles")
    public String listArticles(Model model) {
        model.addAttribute("articles", articleService.findAll());
        model.addAttribute("categories", categoryService.findAll());
        return "articles";
    }
}
```

### Form Handling
```java
@Controller
public class ArticleController {
    @GetMapping("/articles/new")
    public String newArticleForm(Model model) {
        model.addAttribute("article", new Article());
        return "articleForm";
    }

    @PostMapping("/articles")
    public String createArticle(
        @ModelAttribute Article article,
        RedirectAttributes redirectAttributes
    ) {
        articleService.save(article);
        redirectAttributes.addFlashAttribute(
            "message",
            "Article created successfully!"
        );
        return "redirect:/articles";
    }
}
```

## Best Practices

### 1. Controller Organization
```java
@RestController
@RequestMapping("/api/articles")
public class ArticleController {
    // Group related endpoints
    // Use consistent naming
    // Keep controllers focused
}
```

### 2. DTO Pattern
```java
// DTO for creating article
public class CreateArticleRequest {
    private String title;
    private String content;
}

// DTO for article response
public class ArticleResponse {
    private Long id;
    private String title;
    private String summary;
    private int likeCount;
}
```

### 3. Validation
```java
public class ArticleRequest {
    @NotBlank
    @Size(min = 5, max = 100)
    private String title;

    @NotNull
    @Size(min = 20)
    private String content;
}
```

### 4. Documentation
```java
@RestController
@RequestMapping("/api/articles")
public class ArticleController {
    @Operation(summary = "Get article by ID")
    @ApiResponse(
        responseCode = "200",
        description = "Found the article"
    )
    @ApiResponse(
        responseCode = "404",
        description = "Article not found"
    )
    @GetMapping("/{id}")
    public Article getArticle(@PathVariable Long id) {
        return articleService.findById(id);
    }
}
```
