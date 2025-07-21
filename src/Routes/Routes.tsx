import {
  createBrowserRouter,
  RouteObject,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";

import Loading from "../ui/Loading";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.route";
import ProtectedRoute from "./ProtectedRoute";

//* Auth
import SignIn from "../pages/Auth/SignIn";
import OtpPage from "../pages/Auth/OtpPage";

import NotFound from "../ui/NotFound/NotFound";
import DashboardLayout from "../Components/Layout/DashboardLayout";
import { schoolAdminPaths } from "./schoolAdmin.route";
import useUserData from "../hooks/useUserData";

// eslint-disable-next-line react-refresh/only-export-components
function AuthRedirect() {
  const user = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role) {
      navigate(
        `/${user.role === "supperAdmin" ? "admin" : user.role}/overview`,
        { replace: true }
      );
    } else {
      navigate("/sign-in", { replace: true });
    }
  }, [navigate, user]);

  // Optionally display a loading indicator
  return <Loading />;
}

// Define routes with TypeScript types
const router: RouteObject[] = [
  {
    path: "/",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/overview",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "/admin",
    index: true, // This applies to the exact path "/"
    element: <AuthRedirect />,
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths), // Generating child routes dynamically
  },
  {
    path: "school",
    element: (
      <ProtectedRoute role="school">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(schoolAdminPaths), // Generating child routes dynamically
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "sign-in/verify-otp",
    element: <OtpPage />,
  },
  {
    path: "*", // Catch-all for undefined routes
    element: <NotFound />,
  },
];

// Create the router using createBrowserRouter
const routes = createBrowserRouter(router);

export default routes;
