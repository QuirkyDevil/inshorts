# Web Configuration

## Overview
The `WebConfig` class configures Cross-Origin Resource Sharing (CORS) settings for the application, enabling frontend integration with the backend API.

## Key Features

### CORS Configuration
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins(
                "http://localhost:3000",
                "http://localhost:5173",
                "http://127.0.0.1:5173"
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

## Technical Details

### Allowed Origins
- Development servers:
  - React development server (port 3000)
  - Vite development server (port 5173)
  - Alternative Vite localhost address

### HTTP Methods
- GET: Read operations
- POST: Create operations
- PUT: Update operations
- DELETE: Delete operations
- OPTIONS: Pre-flight requests

### Headers and Credentials
- All headers allowed for flexibility
- Credentials enabled for authentication support

## Usage Context

### Development Environment
- Enables local development with separate frontend servers
- Supports hot-reloading capabilities
- Facilitates API testing and integration

### Security Considerations
- Only development origins allowed
- Production configuration should be more restrictive
- Credentials support for secure sessions
