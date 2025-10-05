//* ------------------ICONS------------------
import dashboardLogo from "../../public/images/Dashboard-icons/dashboard.svg";
import settings from "../../public/images/Dashboard-icons/setting.svg";
import fieldOfficer from "../../public/images/Dashboard-icons/fieled_officer.svg";
import leads from "../../public/images/Dashboard-icons/leads.svg";
import clients from "../../public/images/Dashboard-icons/clients.svg";
import repayments from "../../public/images/Dashboard-icons/repayments.svg";

//* ------------------IMPORT COMPONENTS------------------
import PrivacyPolicy from "../pages/Common/settings/PrivacyPolicy";
import Profile from "../pages/Common/settings/Profile";
import Settings from "../pages/Common/settings/Settings";
import SpokeManagerFieldOfficerInfo from "../pages/SpokeManager/SpokeManagerFieldOfficerInfo";
import SpokeManagerOverview from "../pages/SpokeManager/SpokeManagerOverview";
import EditProfile from "../Components/Dashboard/Profile/EditProfile";
import Notification from "../pages/Auth/Notification";
import HubManagerLeads from "../pages/HubManager/HubManagerLeads";
import HubManagerClients from "../pages/HubManager/HubManagerClients";
import HubManagerRepayments from "../pages/HubManager/HubManagerRepayments";

export const spokeManagerPath = [
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
    path: "leads",
    element: <HubManagerLeads />,
    key: "leads",
    name: "Leads",
    icon: leads,
  },
  {
    path: "clients",
    element: <HubManagerClients />,
    key: "clients",
    name: "Clients",
    icon: clients,
  },
  {
    path: "repayments",
    element: <HubManagerRepayments />,
    key: "repayments",
    name: "Repayments",
    icon: repayments,
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
