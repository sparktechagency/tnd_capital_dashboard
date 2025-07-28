//* ------------------ICONS------------------
import dashboardLogo from "../../public/images/Dashboard-icons/dashboard.svg";
import settings from "../../public/images/Dashboard-icons/setting.svg";
import fieldOfficer from "../../public/images/Dashboard-icons/fieled_officer.svg";

//* ------------------IMPORT COMPONENTS------------------
import PrivacyPolicy from "../pages/Common/settings/PrivacyPolicy";
import Profile from "../pages/Common/settings/Profile";
import Settings from "../pages/Common/settings/Settings";
import SpokeManagerFieldOfficerInfo from "../pages/SpokeManager/SpokeManagerFieldOfficerInfo";
import SpokeManagerOverview from "../pages/SpokeManager/SpokeManagerOverview";
import EditProfile from "../Components/Dashboard/Profile/EditProfile";

export const hubManagerPath = [
  {
    path: "overview",
    element: <SpokeManagerOverview />,
    key: "overview",
    name: "Dashboard",
    icon: dashboardLogo,
  },
  {
    path: "field-officers",
    element: <SpokeManagerFieldOfficerInfo />,
    key: "field-officers",
    name: "Field Officers",
    icon: fieldOfficer,
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
];
