# Understanding Spring Security

## What is Spring Security?
Spring Security is a powerful authentication and authorization framework for Spring applications. It provides comprehensive security services for Java applications.

## Key Concepts

### Authentication vs Authorization
- **Authentication**: Verifying who you are (login)
- **Authorization**: Verifying what you're allowed to do (permissions)

## Basic Configuration

### SecurityFilterChain
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin()
                .loginPage("/login")
                .permitAll();
        return http.build();
    }
}
```

### User Details Service
```java
@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            user.getAuthorities()
        );
    }
}
```

## Authentication Methods

### Form Login
```java
http.formLogin()
    .loginPage("/login")           // Custom login page
    .loginProcessingUrl("/auth")   // Login processing URL
    .defaultSuccessUrl("/home")    // Redirect after success
    .failureUrl("/login?error")    // Redirect after failure
```

### Basic Auth
```java
http.httpBasic()  // Enables basic authentication
```

### JWT Authentication
```java
http.oauth2ResourceServer()
    .jwt()
    .decoder(jwtDecoder());
```

## Authorization Rules

### URL-Based Security
```java
http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/public/**").permitAll()
    .requestMatchers("/api/admin/**").hasRole("ADMIN")
    .requestMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
    .anyRequest().authenticated()
)
```

### Method-Level Security
```java
@PreAuthorize("hasRole('ADMIN')")
public void adminOnlyMethod() {
    // Only ADMIN can access
}

@PreAuthorize("hasRole('USER') and #userId == authentication.principal.id")
public void userMethod(Long userId) {
    // Only the user themselves can access
}
```

## Password Encoding

### BCrypt Configuration
```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

// Usage
String encoded = passwordEncoder.encode("rawPassword");
```

## CORS Configuration

### Global CORS
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}
```

## Common Security Headers

### Security Headers Configuration
```java
http.headers()
    .frameOptions().deny()
    .xssProtection()
    .contentSecurityPolicy("script-src 'self'")
```

## Session Management

### Session Configuration
```java
http.sessionManagement()
    .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
    .maximumSessions(1)
    .expiredUrl("/login?expired")
```

## Best Practices

1. **Password Storage**
   - Always encode passwords
   - Use strong encoders (BCrypt, Argon2)
   - Never store plain text passwords

2. **CSRF Protection**
   - Enable for web applications
   - Can disable for stateless APIs
   - Use CSRF tokens in forms

3. **Error Handling**
   - Don't expose sensitive information
   - Use custom error pages
   - Log security events

4. **Authentication Flow**
   - Use HTTPS
   - Implement proper logout
   - Handle session timeouts

## Common Security Vulnerabilities

1. **XSS (Cross-Site Scripting)**
   - Escape user input
   - Use Content Security Policy
   - Enable XSS protection headers

2. **CSRF (Cross-Site Request Forgery)**
   - Use CSRF tokens
   - Validate origin
   - Protect state-changing operations

3. **SQL Injection**
   - Use prepared statements
   - Use JPA/Hibernate
   - Validate input

4. **Authentication Attacks**
   - Implement rate limiting
   - Use strong password policies
   - Enable account locking
