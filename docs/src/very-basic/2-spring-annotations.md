# Understanding Spring Boot Annotations

## What are Annotations?
Annotations in Spring Boot are special markers or labels that provide metadata about a class, method, or field. They tell Spring how to process the code.

## Common Annotations Explained

### Class-Level Annotations

#### @SpringBootApplication
```java
@SpringBootApplication
public class InshortsApplication {
    public static void main(String[] args) {
        SpringApplication.run(InshortsApplication.class, args);
    }
}
```
Combines:
- @Configuration: Marks class as source of bean definitions
- @EnableAutoConfiguration: Enables Spring Boot's auto-configuration
- @ComponentScan: Scans for Spring components in the package

#### @Controller vs @RestController
```java
// Returns view templates
@Controller
public class AdminController {
    @GetMapping("/admin")
    public String dashboard() {
        return "dashboard"; // returns dashboard.html
    }
}

// Returns data directly (JSON)
@RestController
public class ArticleController {
    @GetMapping("/api/articles")
    public List<Article> getArticles() {
        return articles; // returns JSON
    }
}
```

#### @Service
```java
@Service
public class UserService {
    // Business logic here
}
```
- Marks class as service layer component
- Automatically detected during component scanning
- Often contains business logic

#### @Repository
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Methods here
}
```
- Marks class as DAO/Repository
- Enables automatic translation of persistence exceptions

### Method-Level Annotations

#### @Autowired
```java
@Service
public class ArticleService {
    private final ArticleRepository repository;

    @Autowired
    public ArticleService(ArticleRepository repository) {
        this.repository = repository;
    }
}
```
- Injects dependencies automatically
- Can be used on constructors, methods, or fields
- Constructor injection is preferred

#### Request Mapping Annotations
```java
@GetMapping("/articles")     // HTTP GET
@PostMapping("/articles")    // HTTP POST
@PutMapping("/articles/{id}") // HTTP PUT
@DeleteMapping("/articles/{id}") // HTTP DELETE
@PatchMapping("/articles/{id}") // HTTP PATCH
```

#### @Scheduled
```java
@Scheduled(fixedRate = 1000) // Every second
public void doSomething() { }

@Scheduled(cron = "0 0 12 * * ?") // Every day at noon
public void dailyTask() { }
```
- Enables scheduled task execution
- Requires @EnableScheduling on config class

### Field-Level Annotations

#### @Value
```java
@Value("${app.name}")
private String appName;

@Value("${server.port:8080}") // Default value 8080
private int serverPort;
```
- Injects values from properties files
- Can specify default values

#### @Column
```java
@Column(name = "user_name", length = 50, nullable = false)
private String username;
```
- Specifies database column properties
- Part of JPA specification

## Security Annotations

#### @Secured and @PreAuthorize
```java
@Secured("ROLE_ADMIN")
public void adminMethod() { }

@PreAuthorize("hasRole('ADMIN') and #user.name == authentication.name")
public void updateUser(User user) { }
```
- Control method access based on roles/expressions
- Requires @EnableMethodSecurity

## Validation Annotations

#### Bean Validation
```java
public class User {
    @NotNull
    @Size(min = 4, max = 20)
    private String username;

    @Email
    private String email;

    @Min(18)
    private int age;
}
```
- Enables automatic validation
- Common annotations: @NotNull, @Size, @Min, @Max, @Email, @Pattern

## Common Gotchas

1. **Circular Dependencies**
```java
// Avoid this:
@Autowired
private ServiceA serviceA;

// Use constructor injection instead:
private final ServiceA serviceA;

@Autowired
public Constructor(ServiceA serviceA) {
    this.serviceA = serviceA;
}
```

2. **Component Scanning**
```java
// Make sure components are in/under the main application package
com.example.myapp              // Main package
com.example.myapp.controllers  // Will be scanned
com.example.other             // Won't be scanned!
```

3. **Transaction Management**
```java
@Transactional
public void updateUser() {
    // Must be called from another class to work!
    // @Transactional doesn't work for internal calls
}
```
