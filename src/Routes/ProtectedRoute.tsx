import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string;
}

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  // const user = useUserData();
  const user = useAppSelector((state) => state.role);
  // const modifyRole = role === "admin" ? "supperAdmin" : role;

  console.log(user?.role, "protected");

  if (!user || user.role !== role) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
