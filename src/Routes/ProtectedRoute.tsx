import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string;
}

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  // const user = useUserData();
  const user = useAppSelector((state) => state.role);
  const token = Cookies.get("crm_accessToken");
  const twoFactorToken = Cookies.get("twoFactorToken");

  console.log(twoFactorToken, "twoFactorToken");

  // const modifyRole = role === "admin" ? "supperAdmin" : role;
  if (!twoFactorToken) {
    return <Navigate to="/two-fa" replace />;
  }
  if (twoFactorToken && (!token || !user || user.role !== role)) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
