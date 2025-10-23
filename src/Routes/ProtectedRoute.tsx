import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string;
}

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  // const user = useUserData();
  const user = useAppSelector((state) => state.role);
  const token = Cookies.get("crm_accessToken");

  // const modifyRole = role === "admin" ? "supperAdmin" : role;
  if (!token || !user || user.role !== role) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
