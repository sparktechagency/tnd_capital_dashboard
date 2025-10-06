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
import TwoFaLogin from "../pages/Auth/TwoFaLogin";
import TwoFaPage from "../pages/Auth/TwoFaPage";
import UpdatePassword from "../pages/Auth/UpdatePassword";
import { useAppSelector } from "../redux/hooks";
import NotFound from "../ui/NotFound/NotFound";
import { fieldOfficerPath } from "./FieldOfficer.route";
import { HrPaths } from "./Hr.route";
import { hubManagerPath } from "./HubManager.route";
import { spokeManagerPath } from "./spokeManager.route";
import { supervisorPaths } from "./supervisor.route";
import RegisterTwoFa from "../pages/Auth/RegisterTwoFA";
import Cookies from "js-cookie";

// eslint-disable-next-line react-refresh/only-export-components
function AuthRedirect() {
  const user = useAppSelector((state) => state.role);
  const twoFactorToken = Cookies.get("twoFactorToken");

  console.log(twoFactorToken, "twoFactorToken =>>>>>>>>>>>>>>");

  const navigate = useNavigate();

  useEffect(() => {
    // Wait until user is fully loaded (avoid premature redirect)
    if (user === undefined || user === null) return;

    // Redirection logic in correct order
    if (!twoFactorToken) {
      navigate("/two-fa", { replace: true });
      return;
    }

    if (twoFactorToken && !user.role) {
      navigate("/sign-in", { replace: true });
      return;
    }

    if (user.role) {
      navigate(`/${user.role}/overview`, { replace: true });
    }
  }, [user, twoFactorToken, navigate]);

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
    path: "supervisor",
    element: (
      <ProtectedRoute role="supervisor">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(supervisorPaths), // Generating child routes dynamically
  },
  {
    path: "sign-in",
    element: <SignIn />,
  },
  {
    path: "two-fa",
    element: <TwoFaPage />,
  },
  {
    path: "two-fa-login",
    element: <TwoFaLogin />,
  },
  {
    path: "two-fa-register",
    element: <RegisterTwoFa />,
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
