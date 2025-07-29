import { useEffect } from "react";
import {
  createBrowserRouter,
  RouteObject,
  useNavigate,
} from "react-router-dom";

import Loading from "../ui/Loading";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.route";
import ProtectedRoute from "./ProtectedRoute";

//* Auth
import OtpPage from "../pages/Auth/OtpPage";
import SignIn from "../pages/Auth/SignIn";

import DashboardLayout from "../Components/Layout/DashboardLayout";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import UpdatePassword from "../pages/Auth/UpdatePassword";
import { useAppSelector } from "../redux/hooks";
import NotFound from "../ui/NotFound/NotFound";
import { spokeManagerPath } from "./spokeManager.route";
import { HrPaths } from "./Hr.route";
import { hubManagerPath } from "./HubManager.route";
import { fieldOfficerPath } from "./FieldOfficer.route";

// eslint-disable-next-line react-refresh/only-export-components
function AuthRedirect() {
  const user = useAppSelector((state) => state.role);

  const navigate = useNavigate();

  console.log("Ami Hujur", user);

  useEffect(() => {
    if (user && user.role) {
      navigate(`/${user.role}/overview`, { replace: true });
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
    path: "spokeManager",
    element: (
      <ProtectedRoute role="spokeManager">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(spokeManagerPath), // Generating child routes dynamically
  },
  {
    path: "hr",
    element: (
      <ProtectedRoute role="hr">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(HrPaths), // Generating child routes dynamically
  },
  {
    path: "hubManager",
    element: (
      <ProtectedRoute role="hubManager">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(hubManagerPath), // Generating child routes dynamically
  },
  {
    path: "fieldOfficer",
    element: (
      <ProtectedRoute role="fieldOfficer">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(fieldOfficerPath), // Generating child routes dynamically
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },

  {
    path: "forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "forgot-password/verify-otp",
    element: <OtpPage />,
  },
  {
    path: "reset-password",
    element: <UpdatePassword />,
  },

  {
    path: "*", // Catch-all for undefined routes
    element: <NotFound />,
  },
];

// Create the router using createBrowserRouter
const routes = createBrowserRouter(router);

export default routes;
