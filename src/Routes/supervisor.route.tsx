import dashboardLogo from "../../public/images/Dashboard-icons/dashboard.svg";
import dotIcon from "../../public/images/Dashboard-icons/dot.svg";
import settings from "../../public/images/Dashboard-icons/setting.svg";

import EditProfile from "../Components/Dashboard/Profile/EditProfile";
import Notification from "../pages/Auth/Notification";
import PrivacyPolicy from "../pages/Common/settings/PrivacyPolicy";
import Profile from "../pages/Common/settings/Profile";
import Settings from "../pages/Common/settings/Settings";
import HubManagerAllApplications from "../pages/HubManager/HubManagerAllApplications";
import HubManagerApplicationRequest from "../pages/HubManager/HubManagerApplicationRequest";
import HubManagerApplicationRequestDetails from "../pages/HubManager/HubManagerApplicationRequestDetails";

import SupervisorOverview from "../pages/Supervisor/SupervisorOverview";

export const supervisorPaths = [
  {
    path: "overview",
    element: <SupervisorOverview />,
    key: "overview",
    name: "Dashboard",
    icon: dashboardLogo,
  },

  {
    key: "applications",
    name: "Application",
    icon: dashboardLogo,
    children: [
      {
        key: "applications",
        path: "applications/all-applications",
        name: "All Applications",
        element: <HubManagerAllApplications />,
        icon: dotIcon,
      },
      {
        key: "applications",
        path: "applications/all-application-requests",
        name: "All Applications",
        element: <HubManagerApplicationRequest />,
        icon: dotIcon,
      },
    ],
  },

  {
    key: "applications",
    path: "applications/all-application-requests-details/:id",
    element: <HubManagerApplicationRequestDetails />,
  },

  {
    path: "settings",
    element: <Settings />,
    key: "settings",
    name: "Settings",
    icon: settings,
  },
  {
    path: "settings/profile",
    element: <Profile />,
    key: "settings",
  },
  {
    path: "settings/edit-profile",
    element: <EditProfile />,
    key: "settings",
  },
  {
    path: "settings/support",
    element: <PrivacyPolicy />,
    key: "settings",
  },
  {
    path: "notification",
    element: <Notification />,
    key: "notification",
  },
];
