//* ------------------ICONS------------------
import application from "../../public/images/Dashboard-icons/application.svg";
import clients from "../../public/images/Dashboard-icons/clients.svg";
import dashboardLogo from "../../public/images/Dashboard-icons/dashboard.svg";
import leads from "../../public/images/Dashboard-icons/leads.svg";
import repayments from "../../public/images/Dashboard-icons/repayments.svg";
import report from "../../public/images/Dashboard-icons/reportAndAnalytics.svg";
import settings from "../../public/images/Dashboard-icons/setting.svg";
import tracking from "../../public/images/Dashboard-icons/tracking.svg";

//* ------------------IMPORT COMPONENTS------------------
import EditProfile from "../Components/Dashboard/Profile/EditProfile";
import PrivacyPolicy from "../pages/Common/settings/PrivacyPolicy";
import Profile from "../pages/Common/settings/Profile";
import Settings from "../pages/Common/settings/Settings";
import FieldOfficerAddNewLeads from "../pages/FieldOfficer/FieldOfficerAddNewLeads";
import FieldOfficerApplications from "../pages/FieldOfficer/FieldOfficerApplications";
import FieldOfficerClients from "../pages/FieldOfficer/FieldOfficerClients";
import FieldOfficerEditLoanApply from "../pages/FieldOfficer/FieldOfficerEditLoanApply";
import FieldOfficerEditNewLeads from "../pages/FieldOfficer/FieldOfficerEditNewLeads";
import FieldOfficerLoanApply from "../pages/FieldOfficer/FieldOfficerLoanApply";
import FieldOfficerNewLeads from "../pages/FieldOfficer/FieldOfficerNewLeads";
import FieldOfficerOverview from "../pages/FieldOfficer/FieldOfficerOverview";
import FieldOfficerRepayments from "../pages/FieldOfficer/FieldOfficerRepayments";
import FieldOfficerReportsAndAnalytics from "../pages/FieldOfficer/FieldOfficerReportsAndAnalytics";
import FieldOfficerTracking from "../pages/FieldOfficer/FieldOfficerTracking";

export const fieldOfficerPath = [
  {
    path: "overview",
    element: <FieldOfficerOverview />,
    key: "overview",
    name: "Dashboard",
    icon: dashboardLogo,
  },
  {
    path: "new-leads",
    element: <FieldOfficerNewLeads />,
    key: "new-leads",
    name: "New Leads",
    icon: leads,
  },
  {
    path: "new-leads/add-new-leads",
    element: <FieldOfficerAddNewLeads />,
    key: "new-leads",
  },
  {
    path: "new-leads/edit-new-leads/:id",
    element: <FieldOfficerEditNewLeads />,
    key: "new-leads",
  },
  {
    path: "applications",
    element: <FieldOfficerApplications />,
    key: "applications",
    name: "Applications",
    icon: application,
  },

  {
    path: "applications/loan-apply",
    element: <FieldOfficerLoanApply />,
    key: "applications",
  },
  {
    path: "applications/edit-loan-apply/:id",
    element: <FieldOfficerEditLoanApply />,
    key: "applications",
  },
  {
    path: "clients",
    element: <FieldOfficerClients />,
    key: "clients",
    name: "Clients",
    icon: clients,
  },
  {
    path: "repayments",
    element: <FieldOfficerRepayments />,
    key: "repayments",
    name: "Repayments",
    icon: repayments,
  },
  {
    path: "tracking",
    element: <FieldOfficerTracking />,
    key: "tracking",
    name: "Tracking",
    icon: tracking,
  },
  {
    path: "reports-and-analytics",
    element: <FieldOfficerReportsAndAnalytics />,
    key: "reports-and-analytics",
    name: "Reports & Analytics",
    icon: report,
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
