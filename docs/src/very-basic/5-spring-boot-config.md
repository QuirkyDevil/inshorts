# Understanding Spring Boot Configuration

## Application Properties

### Basic Configuration File
```properties
# Server configuration
server.port=8080
server.servlet.context-path=/api

# Database configuration
spring.datasource.url=jdbc:mysql://localhost:3306/inshorts
spring.datasource.username=root
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate properties
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

## Multiple Environment Configurations

### Profile-Specific Properties
```properties
# application-dev.properties
spring.datasource.url=jdbc:mysql://localhost:3306/inshorts_dev

# application-prod.properties
spring.datasource.url=jdbc:mysql://prod-db:3306/inshorts_prod
```

### Activating Profiles
```properties
# Active profile
spring.profiles.active=dev

# Multiple profiles
spring.profiles.active=dev,local,swagger
```

## Common Configuration Properties

### Security Configuration
```properties
# Session timeout
server.servlet.session.timeout=30m

# CORS configuration
spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE
```

### Logging Configuration
```properties
# Log levels
logging.level.root=INFO
logging.level.com.example.inshorts=DEBUG
logging.level.org.springframework.security=DEBUG

# Log file
logging.file.name=logs/application.log
logging.pattern.file=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n
```

### File Upload Configuration
```properties
# File upload limits
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

## Configuration Classes

### @ConfigurationProperties
```java
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private String name;
    private String apiUrl;
    private int maxResults;

    // Getters and setters
}

// In application.properties
app.name=Inshorts Clone
app.api-url=http://api.example.com
app.max-results=100
```

### Using @Value
```java
@Service
public class MyService {
    @Value("${app.name}")
    private String appName;

    @Value("${app.max-results:50}") // Default value 50
    private int maxResults;
}
```

## YAML Configuration
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/inshorts
    username: root
    password: password
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true

server:
  port: 8080
  servlet:
    context-path: /api

logging:
  level:
    root: INFO
    com.example.inshorts: DEBUG
```

## Best Practices

### 1. Externalization
```properties
# Use environment variables
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USER}
spring.datasource.password=${DATABASE_PASSWORD}
```

### 2. Profile Management
```java
@Profile("dev")
@Configuration
public class DevConfig {
    // Development-specific beans
}

@Profile("prod")
@Configuration
public class ProdConfig {
    // Production-specific beans
}
```

### 3. Custom Properties Validation
```java
@Validated
@ConfigurationProperties(prefix = "app")
public class AppProperties {
    @NotNull
    @Size(min = 3, max = 50)
    private String name;

    @Min(1)
    @Max(1000)
    private int maxResults;
}
```

## Common Use Cases

### 1. Database Configuration
```properties
# Connection pool
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=300000

# JPA specific
spring.jpa.properties.hibernate.jdbc.batch_size=50
spring.jpa.properties.hibernate.jdbc.fetch_size=50
```

### 2. Actuator Configuration
```properties
# Enable specific endpoints
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always

# Custom info
info.app.name=Inshorts Clone
info.app.description=News Aggregation Platform
info.app.version=1.0.0
```

### 3. Cache Configuration
```properties
# Redis cache
spring.cache.type=redis
spring.redis.host=localhost
spring.redis.port=6379

# Caffeine cache
spring.cache.cache-names=articles,users
spring.cache.caffeine.spec=maximumSize=500,expireAfterAccess=600s
```
