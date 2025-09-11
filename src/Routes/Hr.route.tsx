//* ------------------ICONS------------------
import dashboardLogo from "../../public/images/Dashboard-icons/dashboard.svg";
import fieldOfficer from "../../public/images/Dashboard-icons/fieled_officer.svg";
import settings from "../../public/images/Dashboard-icons/setting.svg";
import managerIcon from "../../public/images/Dashboard-icons/manager.svg";

//* ------------------IMPORT COMPONENTS------------------
import EditProfile from "../Components/Dashboard/Profile/EditProfile";
import PrivacyPolicy from "../pages/Common/settings/PrivacyPolicy";
import Profile from "../pages/Common/settings/Profile";
import Settings from "../pages/Common/settings/Settings";
import HRAddOfficer from "../pages/HR/HRAddOfficer";
import HREditOfficer from "../pages/HR/HREditOfficer";
import HROfficers from "../pages/HR/HROfficers";

import HRManagers from "../pages/HR/HRManagers";
import HROverview from "../pages/HR/HROverview";
import HRAddManager from "../pages/HR/HRAddManager";
import HREditManager from "../pages/HR/HREditManager";
import Notification from "../pages/Auth/Notification";

export const HrPaths = [
  {
    path: "overview",
    element: <HROverview />,
    key: "overview",
    name: "Dashboard",
    icon: dashboardLogo,
  },
  {
    path: "officers",
    element: <HROfficers />,
    key: "officers",
    name: "Add Officers",
    icon: fieldOfficer,
  },

  {
    path: "officers/add-officers",
    element: <HRAddOfficer />,
    key: "officers",
  },
  {
    path: "officers/edit-officers/:id",
    element: <HREditOfficer />,
    key: "officers",
  },

  {
    path: "managers",
    element: <HRManagers />,
    key: "managers",
    name: "Add Managers",
    icon: managerIcon,
  },
  {
    path: "managers/add-manager",
    element: <HRAddManager />,
    key: "managers",
  },
  {
    path: "managers/edit-manager/:id",
    element: <HREditManager />,
    key: "managers",
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
