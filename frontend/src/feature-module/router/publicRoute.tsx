import { Navigate } from "react-router-dom";
import { all_routes } from "./all_routes";
import { useAuth } from "../../context/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to={all_routes.homeone} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
