//* ------------------ICONS------------------
import applicationLogo from "../../public/images/Dashboard-icons/application.svg";
import clientsLogo from "../../public/images/Dashboard-icons/clients.svg";
import dashboardLogo from "../../public/images/Dashboard-icons/dashboard.svg";
import fieldOfficerLogo from "../../public/images/Dashboard-icons/fieled_officer.svg";
import hrLogo from "../../public/images/Dashboard-icons/hr.svg";
import leadsLogo from "../../public/images/Dashboard-icons/leads.svg";
import loneLogo from "../../public/images/Dashboard-icons/loan.svg";
import managerLogo from "../../public/images/Dashboard-icons/manager.svg";
import officerRecord from "../../public/images/Dashboard-icons/officer_Records.svg";
import repaymentsLogo from "../../public/images/Dashboard-icons/repayments.svg";
import settings from "../../public/images/Dashboard-icons/setting.svg";
import EditProfile from "../Components/Dashboard/Profile/EditProfile";

//* ------------------IMPORT COMPONENTS------------------
import AdminAddHrInformation from "../pages/Admin/AdminAddHRInformation";
import AdminApplication from "../pages/Admin/AdminApplication";
import AdminClients from "../pages/Admin/AdminClients";
import AdminEditFieldOfficerInfo from "../pages/Admin/AdminEditFieldOfficerInfo";
import AdminEditHRInformation from "../pages/Admin/AdminEditHRInformation";
import AdminEditLeadInformation from "../pages/Admin/AdminEditLeadInformation";
import EditManagerInformation from "../pages/Admin/AdminEditManagerInformation";
import AdminFieldOfficers from "../pages/Admin/AdminFieldOfficers";
import AdminHr from "../pages/Admin/AdminHr";
import AdminLeadInformation from "../pages/Admin/AdminLeadInformation";
import AdminLeads from "../pages/Admin/AdminLeads";
import AdminLone from "../pages/Admin/AdminLone";
import AdminManagerInformation from "../pages/Admin/AdminManagerInformation";
import AdminManagers from "../pages/Admin/AdminManagers";
import AdminOfficerInformation from "../pages/Admin/AdminOfficerInformation";
import AdminOfficerRecord from "../pages/Admin/AdminOfficerRecord";
import AdminOverview from "../pages/Admin/AdminOverview";
import AdminRepayments from "../pages/Admin/AdminRepayments";
import Notifications from "../pages/Common/Notifications";
import PrivacyPolicy from "../pages/Common/settings/PrivacyPolicy";
import Profile from "../pages/Common/settings/Profile";
import Settings from "../pages/Common/settings/Settings";

export const adminPaths = [
  {
    path: "overview",
    element: <AdminOverview />,
    key: "overview",
    name: "Dashboard",
    icon: dashboardLogo,
  },
  {
    path: "notifications",
    element: <Notifications />,
    key: "notifications",
  },
  {
    path: "leads",
    element: <AdminLeads />,
    key: "leads",
    name: "Leads",
    icon: leadsLogo,
  },

  {
    path: "leads/lead-information",
    key: "leads",
    element: <AdminLeadInformation />,
  },
  {
    path: "leads/edit-lead-information",
    key: "leads",
    element: <AdminEditLeadInformation />,
  },

  {
    path: "applications",
    element: <AdminApplication />,
    key: "applications",
    name: "Application",
    icon: applicationLogo,
  },
  {
    path: "lone",
    element: <AdminLone />,
    key: "lone",
    name: "Lone",
    icon: loneLogo,
  },
  {
    path: "clients",
    element: <AdminClients />,
    key: "clients",
    name: "Clients",
    icon: clientsLogo,
  },
  {
    path: "repayments",
    element: <AdminRepayments />,
    key: "repayments",
    name: "Repayments",
    icon: repaymentsLogo,
  },
  {
    path: "field-officers",
    element: <AdminFieldOfficers />,
    key: "field-officers",
    name: "Field Officers",
    icon: fieldOfficerLogo,
  },

  {
    path: "field-officers/officer-information",
    key: "field-officers",
    element: <AdminOfficerInformation />,
  },
  {
    path: "field-officers/edit-officer-information",
    key: "field-officers",
    element: <AdminEditFieldOfficerInfo />,
  },

  {
    path: "managers",
    element: <AdminManagers />,
    key: "managers",
    name: "Managers",
    icon: managerLogo,
  },

  {
    path: "managers/manager-information",
    element: <AdminManagerInformation />,
    key: "managers",
  },
  {
    path: "managers/edit-manager-information",
    element: <EditManagerInformation />,
    key: "managers",
  },
  {
    path: "hr",
    element: <AdminHr />,
    key: "hr",
    name: "HR",
    icon: hrLogo,
  },
  {
    path: "hr/add-hr-information",
    element: <AdminAddHrInformation />,
    key: "hr",
  },
  {
    path: "hr/edit-hr-information",
    element: <AdminEditHRInformation />,
    key: "hr",
  },
  {
    path: "officer_record",
    element: <AdminOfficerRecord />,
    key: "officer_record",
    name: "Officer Record",
    icon: officerRecord,
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
