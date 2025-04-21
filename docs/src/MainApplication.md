# Main Application

## Overview
The `AWebsiteLikeInshortsWithAdminDashboardApplication` class serves as the entry point for the Spring Boot application, configuring the core application settings and bootstrapping the system.

## Configuration

### Spring Boot Application
```java
@SpringBootApplication
public class AWebsiteLikeInshortsWithAdminDashboardApplication {
    public static void main(String[] args) {
        SpringApplication.run(
            AWebsiteLikeInshortsWithAdminDashboardApplication.class,
            args
        );
    }
}
```

### Scheduling Support
Enabled via `@EnableScheduling` in SchedulingConfig:
```java
@Configuration
@EnableScheduling
public class SchedulingConfig {
    // This configuration enables scheduling in the application
}
```

## Features

### Auto-Configuration
- Component scanning
- Bean registration
- Property source loading
- Embedded server configuration

### Scheduled Tasks Support
- Analytics service scheduling
- Daily report generation
- Trending score calculations

## Technical Details

### Dependencies
- Spring Boot Starter Web
- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- Thymeleaf templating engine

### Application Properties
Located in `src/main/resources/application.properties`:
- Database configuration
- Server settings
- Logging configuration
- Security properties

## Usage

### Development
```bash
# Run application with Maven
./mvnw spring-boot:run

# Build JAR
./mvnw clean package
```

### Production
```bash
# Run JAR file
java -jar target/inshorts-0.0.1-SNAPSHOT.jar
```
