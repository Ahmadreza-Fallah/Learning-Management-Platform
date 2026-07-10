import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface RoleRouteProps {
  children: React.ReactNode;
  roles: number[];
}

const RoleRoute = ({ children, roles }: RoleRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.roleId)) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;
