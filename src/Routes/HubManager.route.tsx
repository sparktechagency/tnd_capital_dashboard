//* ------------------ICONS------------------
import dashboardLogo from "../../public/images/Dashboard-icons/dashboard.svg";
import dotIcon from "../../public/images/Dashboard-icons/dot.svg";
import fieldOfficer from "../../public/images/Dashboard-icons/fieled_officer.svg";
import leadsIcon from "../../public/images/Dashboard-icons/leads.svg";
import settings from "../../public/images/Dashboard-icons/setting.svg";

//* ------------------IMPORT COMPONENTS------------------
import EditProfile from "../Components/Dashboard/Profile/EditProfile";
import PrivacyPolicy from "../pages/Common/settings/PrivacyPolicy";
import Profile from "../pages/Common/settings/Profile";
import Settings from "../pages/Common/settings/Settings";
import HubManagerAllApplications from "../pages/HubManager/HubManagerAllApplications";
import HubManagerAllFieldOfficerRequest from "../pages/HubManager/HubManagerAllFieldOfficerRequest";
import HubManagerAllFieldOfficers from "../pages/HubManager/HubManagerAllFieldOfficers";
import HubManagerApplicationRequest from "../pages/HubManager/HubManagerApplicationRequest";
import HubManagerClients from "../pages/HubManager/HubManagerClients";
import HubManagerLeads from "../pages/HubManager/HubManagerLeads";
import HubManagerOverview from "../pages/HubManager/HubManagerOverview";
import HubManagerRepayments from "../pages/HubManager/HubManagerRepayments";

export const hubManagerPath = [
  {
    path: "overview",
    element: <HubManagerOverview />,
    key: "overview",
    name: "Dashboard",
    icon: dashboardLogo,
  },

  {
    path: "leads",
    element: <HubManagerLeads />,
    key: "leads",
    name: "Leads",
    icon: leadsIcon,
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
    path: "clients",
    element: <HubManagerClients />,
    key: "clients",
    name: "Clients",
    icon: fieldOfficer,
  },
  {
    path: "repayments",
    element: <HubManagerRepayments />,
    key: "repayments",
    name: "Repayments",
    icon: fieldOfficer,
  },

  {
    key: "fieldOfficer",
    name: "Field Officers",
    icon: dashboardLogo,
    children: [
      {
        key: "fieldOfficer",
        path: "fieldOfficer/all-field-officer-requests",
        name: "All Requests",
        element: <HubManagerAllFieldOfficerRequest />,
        icon: dotIcon,
      },
      {
        key: "fieldOfficer",
        path: "fieldOfficer/all-field-officers",
        name: "All Field Officers",
        element: <HubManagerAllFieldOfficers />,
        icon: dotIcon,
      },
    ],
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
