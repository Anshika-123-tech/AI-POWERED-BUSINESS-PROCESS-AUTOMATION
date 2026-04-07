import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAuth?: boolean;
}

export function ProtectedRoute({ children, requiredAuth = true }: ProtectedRouteProps) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (requiredAuth && !isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  if (!requiredAuth && isLoggedIn) {
    return <Navigate to="/customer/dashboard" replace />;
  }

  return <>{children}</>;
}
