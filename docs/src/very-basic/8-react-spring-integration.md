# React and Spring Boot Integration

## Overview
Understanding how React frontend integrates with Spring Boot backend in a full-stack application.

## Architecture

### Frontend-Backend Communication
```typescript
// API client setup (axios)
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Making API calls
const getArticles = async () => {
    const response = await api.get('/articles');
    return response.data;
};
```

### Authentication Flow

#### Frontend (React)
```typescript
// Login function
const login = async (username: string, password: string) => {
    const response = await api.post('/auth/login', {
        username,
        password
    });
    if (response.data.status === 'success') {
        // Store user session
        setAuthState({
            isAuthenticated: true,
            user: response.data.user
        });
    }
};

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};
```

#### Backend (Spring Boot)
```java
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class AuthController {
    // Authentication endpoints
}
```

## State Management

### Context API Usage
```typescript
// Auth context
interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState({
        isAuthenticated: false,
        user: null
    });

    // Authentication logic
};
```

### API Integration
```typescript
// Custom hook for API calls
const useApi = <T>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(url);
                setData(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};
```

## Error Handling

### Frontend Error Handling
```typescript
// Global error interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            // Handle unauthorized access
            authContext.logout();
            navigate('/login');
        }
        return Promise.reject(error);
    }
);

// Component error handling
const ArticleList = () => {
    const { data, error, loading } = useApi<Article[]>('/articles');

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error.message} />;

    return <ArticleGrid articles={data || []} />;
};
```

### Cross-Origin Resource Sharing (CORS)
```typescript
// Frontend configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

// Backend configuration
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowCredentials(true);
    }
}
```

## Best Practices

### 1. API Organization
```typescript
// API service modules
export const articleApi = {
    getAll: () => api.get('/articles'),
    getById: (id: number) => api.get(`/articles/${id}`),
    create: (article: ArticleInput) => api.post('/articles', article),
    update: (id: number, article: ArticleInput) =>
        api.put(`/articles/${id}`, article),
    delete: (id: number) => api.delete(`/articles/${id}`)
};
```

### 2. Type Safety
```typescript
// Type definitions
interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
    publishedAt: string;
}

// Type-safe components
interface ArticleProps {
    article: Article;
    onLike: (id: number) => Promise<void>;
}

const ArticleCard = ({ article, onLike }: ArticleProps) => {
    // Component implementation
};
```

### 3. Environment Configuration
```typescript
// Frontend (.env)
VITE_API_URL=http://localhost:8080/api

// Backend (application.properties)
cors.allowed-origins=http://localhost:5173
```

## Development Workflow

### Local Development
1. Start Spring Boot backend:
```bash
./mvnw spring-boot:run
```

2. Start React development server:
```bash
cd frontend
pnpm dev
```

### Build and Deployment
```bash
# Frontend build
cd frontend
pnpm build

# Backend build
./mvnw clean package
```
