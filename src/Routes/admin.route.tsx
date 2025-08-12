//* ------------------ICONS------------------
import applicationLogo from "../../public/images/Dashboard-icons/application.svg";
import clientsLogo from "../../public/images/Dashboard-icons/clients.svg";
import dashboardLogo from "../../public/images/Dashboard-icons/dashboard.svg";
import fieldOfficerLogo from "../../public/images/Dashboard-icons/fieled_officer.svg";
import hrLogo from "../../public/images/Dashboard-icons/hr.svg";
import leadsLogo from "../../public/images/Dashboard-icons/leads.svg";
import loneLogo from "../../public/images/Dashboard-icons/loan.svg";
import location from "../../public/images/Dashboard-icons/location.svg";
import managerLogo from "../../public/images/Dashboard-icons/manager.svg";
import officerRecord from "../../public/images/Dashboard-icons/officer_Records.svg";
import repaymentsLogo from "../../public/images/Dashboard-icons/repayments.svg";
import settings from "../../public/images/Dashboard-icons/setting.svg";
import supervisor from "../../public/images/Dashboard-icons/supervisor.svg";
import EditProfile from "../Components/Dashboard/Profile/EditProfile";

//* ------------------IMPORT COMPONENTS------------------
import AdminAddHrInformation from "../pages/Admin/AdminAddHRInformation";
import AdminAddRepayments from "../pages/Admin/AdminAddRepayments";
import AdminAddSupervisor from "../pages/Admin/AdminAddSupervisor";
import AdminApplication from "../pages/Admin/AdminApplication";
import AdminClients from "../pages/Admin/AdminClients";
import AdminEditFieldOfficerInfo from "../pages/Admin/AdminEditFieldOfficerInfo";
import AdminEditHRInformation from "../pages/Admin/AdminEditHRInformation";
import AdminEditLeadInformation from "../pages/Admin/AdminEditLeadInformation";
import EditManagerInformation from "../pages/Admin/AdminEditManagerInformation";
import AdminEditSupervisor from "../pages/Admin/AdminEditSupervisor";
import AdminFieldOfficers from "../pages/Admin/AdminFieldOfficers";
import AdminHr from "../pages/Admin/AdminHr";
import AdminLeadInformation from "../pages/Admin/AdminLeadInformation";
import AdminLeads from "../pages/Admin/AdminLeads";
import AdminLocationProfile from "../pages/Admin/AdminLocationProfile";
import AdminLone from "../pages/Admin/AdminLone";
import AdminManagerInformation from "../pages/Admin/AdminManagerInformation";
import AdminManagers from "../pages/Admin/AdminManagers";
import AdminOfficerInformation from "../pages/Admin/AdminOfficerInformation";
import AdminOfficerRecord from "../pages/Admin/AdminOfficerRecord";
import AdminOverview from "../pages/Admin/AdminOverview";
import AdminRepayments from "../pages/Admin/AdminRepayments";
import AdminSupervisor from "../pages/Admin/AdminSupervisor";
import EditRepaymentsInformation from "../pages/Admin/EditRepaymentsInformation";
import EditSupervisorInformation from "../pages/Admin/EditSupervisorInformation";
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
    path: "repayments/add-repayments",
    element: <AdminAddRepayments />,
    key: "repayments",
  },
  {
    path: "repayments/edit-repayments-information",
    element: <EditRepaymentsInformation />,
    key: "repayments",
  },
  {
    path: "hr",
    element: <AdminHr />,
    key: "hr",
    name: "HR",
    icon: hrLogo,
  },
  {
    path: "supervisory",
    element: <AdminSupervisor />,
    key: "supervisory",
    name: "Supervisory",
    icon: supervisor,
  },
  {
    path: "supervisory/add-supervisor",
    element: <AdminAddSupervisor />,
    key: "supervisory",
  },
  {
    path: "supervisory/edit-supervisor-information",
    element: <EditSupervisorInformation />,
    key: "supervisory",
  },
  {
    path: "supervisory/edit-supervisor/:id",
    element: <AdminEditSupervisor />,
    key: "supervisory",
  },

  // {
  //   path: "supervisory",
  //   element: <AdminHr />,
  //   key: "Supervisory",
  //   name: "Supervisory",
  //   icon: hrLogo,
  // },
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
    path: "officer_record",
    element: <AdminOfficerRecord />,
    key: "officer_record",
    name: "Officer Record",
    icon: officerRecord,
  },

  {
    path: "location",
    element: <AdminLocationProfile />,
    key: "location",
    name: "Location Profile",
    icon: location,
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
