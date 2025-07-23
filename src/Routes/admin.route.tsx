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

//* ------------------IMPORT COMPONENTS------------------
import Notifications from "../pages/Common/Notifications";
import GradeSystem from "../pages/SchoolAdmin/GradeSystem";
import AdminApplication from "../pages/Admin/AdminApplication";
import AdminClients from "../pages/Admin/AdminClients";
import AdminFieldOfficers from "../pages/Admin/AdminFieldOfficers";
import AdminHr from "../pages/Admin/AdminHr";
import AdminLeads from "../pages/Admin/AdminLeads";
import AdminLone from "../pages/Admin/AdminLone";
import AdminManagers from "../pages/Admin/AdminManagers";
import AdminOfficerRecord from "../pages/Admin/AdminOfficerRecord";
import AdminOverview from "../pages/Admin/AdminOverview";
import AdminRepayments from "../pages/Admin/AdminRepayments";

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
    path: "applications",
    element: <AdminApplication />,
    key: "application",
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
    path: "field_officers",
    element: <AdminFieldOfficers />,
    key: "field_officers",
    name: "Field Officers",
    icon: fieldOfficerLogo,
  },
  {
    path: "managers",
    element: <AdminManagers />,
    key: "managers",
    name: "Managers",
    icon: managerLogo,
  },
  {
    path: "hr",
    element: <AdminHr />,
    key: "hr",
    name: "HR",
    icon: hrLogo,
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
    element: <GradeSystem />,
    key: "settings",
    name: "Settings",
    icon: settings,
  },
];
