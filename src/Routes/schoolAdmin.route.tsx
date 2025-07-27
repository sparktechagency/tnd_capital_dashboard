//* ------------------ICONS------------------
import applicationLogo from "../../public/images/Dashboard-icons/application.svg";
import clientsLogo from "../../public/images/Dashboard-icons/clients.svg";
import dashboardLogo from "../../public/images/Dashboard-icons/dashboard.svg";
import hrLogo from "../../public/images/Dashboard-icons/hr.svg";
import leadsLogo from "../../public/images/Dashboard-icons/leads.svg";
import loneLogo from "../../public/images/Dashboard-icons/loan.svg";
import managerLogo from "../../public/images/Dashboard-icons/manager.svg";
import officerRecord from "../../public/images/Dashboard-icons/officer_Records.svg";
import repaymentsLogo from "../../public/images/Dashboard-icons/repayments.svg";
import settings from "../../public/images/Dashboard-icons/setting.svg";

//* ------------------IMPORT COMPONENTS------------------
import Notifications from "../pages/Common/Notifications";
import AssignmentPage from "../pages/SchoolAdmin/AssignmentPage";
import ClassPage from "../pages/SchoolAdmin/Class";
import ClassSchedulePage from "../pages/SchoolAdmin/ClassSchedulePage";
import ExamPage from "../pages/SchoolAdmin/Exam";
import GradeSystem from "../pages/SchoolAdmin/GradeSystem";
import SchoolAdminOVerview from "../pages/SchoolAdmin/SchoolAdminOVerview";
import SchoolAdminStudent from "../pages/SchoolAdmin/SchoolAdminStudent";
import SchoolAdminTeachers from "../pages/SchoolAdmin/SchoolAdminTeachers";
import SubjectPage from "../pages/SchoolAdmin/Subject";

export const schoolAdminPaths = [
  {
    path: "overview",
    element: <SchoolAdminOVerview />,
    key: "overview",
    name: "Overview",
    icon: dashboardLogo,
  },
  {
    path: "notifications",
    element: <Notifications />,
    key: "notifications",
  },
  {
    path: "leads",
    element: <ClassPage />,
    key: "leads",
    name: "Leads",
    icon: leadsLogo,
  },
  {
    path: "applications",
    element: <ClassSchedulePage />,
    key: "application",
    name: "Application",
    icon: applicationLogo,
  },
  {
    path: "lone",
    element: <SubjectPage />,
    key: "lone",
    name: "Lone",
    icon: loneLogo,
  },
  {
    path: "clients",
    element: <SchoolAdminStudent />,
    key: "clients",
    name: "Clients",
    icon: clientsLogo,
  },
  {
    path: "repayments",
    element: <SchoolAdminTeachers />,
    key: "repayments",
    name: "Repayments",
    icon: repaymentsLogo,
  },

  {
    path: "managers",
    element: <AssignmentPage />,
    key: "managers",
    name: "Managers",
    icon: managerLogo,
  },
  {
    path: "hr",
    element: <ExamPage />,
    key: "hr",
    name: "HR",
    icon: hrLogo,
  },
  {
    path: "officer_record",
    element: <GradeSystem />,
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
