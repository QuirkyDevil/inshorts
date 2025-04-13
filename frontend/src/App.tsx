import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

// Pages
import { HomePage } from './pages/HomePage';
import { NewestArticlesPage } from './pages/NewestArticlesPage';
import { TrendingArticlesPage } from './pages/TrendingArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminArticlesPage } from './pages/AdminArticlesPage';
import { ArticleFormPage } from './pages/ArticleFormPage';

// Create a client
const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode, requiredRole?: string }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !user.roles.includes(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/newest" element={<NewestArticlesPage />} />
            <Route path="/trending" element={<TrendingArticlesPage />} />
            <Route path="/article/:id" element={<ArticleDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Admin Routes - Protected */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="ROLE_ADMIN">
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles"
              element={
                <ProtectedRoute requiredRole="ROLE_ADMIN">
                  <AdminArticlesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles/new"
              element={
                <ProtectedRoute requiredRole="ROLE_ADMIN">
                  <ArticleFormPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles/edit/:id"
              element={
                <ProtectedRoute requiredRole="ROLE_ADMIN">
                  <ArticleFormPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback - 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
