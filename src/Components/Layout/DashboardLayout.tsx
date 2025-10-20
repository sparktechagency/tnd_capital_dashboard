/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { Link, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import logout from "../../../public/images/Dashboard-icons/logout.svg";
import { fieldOfficerPath } from "../../Routes/FieldOfficer.route";
import { HrPaths } from "../../Routes/Hr.route";
import { hubManagerPath } from "../../Routes/HubManager.route";
import { adminPaths } from "../../Routes/admin.route";
import { spokeManagerPath } from "../../Routes/spokeManager.route";
import { supervisorPaths } from "../../Routes/supervisor.route";
import { setCollapsed } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeRole } from "../../redux/slice";
import getActiveKeys from "../../utils/activeKey";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import Cookies from "js-cookie";

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  // const userRole = useUserData();
  const location = useLocation();
  const userRole = useAppSelector((state) => state.role);
  const { collapsed } = useAppSelector((state) => state.auth);

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const rootSubmenuKeys = ["applications"];

  const handleLogout = () => {
    dispatch(changeRole(null));
    Cookies.remove("crm_accessToken");
    Cookies.remove("twoFactorToken");
    window.location.href = "/";
    window.location.reload();
  };

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(
      (key: string) => openKeys.indexOf(key) === -1
    );
    if (latestOpenKey && rootSubmenuKeys.includes(latestOpenKey)) {
      setOpenKeys([latestOpenKey]); // Only keep the latest submenu open
    } else {
      setOpenKeys(keys); // Update normally for closing or nested submenus
    }
  };

  const defaultUrl = userRole?.role === "admin" ? "/admin" : "/";
  const normalizedPath = location.pathname.replace(defaultUrl, "");


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        // setCollapsed(true);
        dispatch(setCollapsed(true));
      } else {
        // setCollapsed(false);
        dispatch(setCollapsed(false));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const activeKeys = getActiveKeys(normalizedPath);
  let menuItems: any = [];

  console.log(userRole?.role, "role");
  if (userRole?.role === "admin") {
    menuItems = sidebarItemsGenerator(adminPaths, "admin");
  } else if (userRole?.role === "spokeManager") {
    menuItems = sidebarItemsGenerator(spokeManagerPath, "spokeManager");
  } else if (userRole?.role === "hr") {
    menuItems = sidebarItemsGenerator(HrPaths, "hr");
  } else if (userRole?.role === "hubManager") {
    menuItems = sidebarItemsGenerator(hubManagerPath, "hubManager");
  } else if (userRole?.role === "fieldOfficer") {
    menuItems = sidebarItemsGenerator(fieldOfficerPath, "fieldOfficer");
  } else if (userRole?.role === "supervisor") {
    menuItems = sidebarItemsGenerator(supervisorPaths, "supervisor");
  }

  menuItems.push({
    key: "logout",
    icon: (
      <img
        src={logout}
        alt="logout"
        width={16}
        height={16}
        style={{ color: "#000", fontSize: "16px", marginRight: "5px" }}
      />
    ),
    label: <div onClick={handleLogout}>Logout</div>,
  });

  return (
    <div className="h-screen bg-primary-color ">
      <ScrollRestoration />

      <Layout className="flex !bg-primary-color">
        <Sider
          theme="light"
          width={350}
          trigger={null}
          breakpoint="lg"
          collapsedWidth="0"
          collapsible
          collapsed={collapsed}
          style={{
            position: "sticky",
            top: 0,
            paddingLeft: "10px",
            height: "100vh",
            overflowY: "auto",
          }}
          className=""
        >
          <Link to="/">
            <img
              src={AllImages.logo}
              alt="logo"
              className="w-[80%] mx-auto h-auto my-8"
            />
          </Link>

          <Menu
            mode="inline"
            openKeys={openKeys} // Bind openKeys state
            onOpenChange={onOpenChange} // Handle open/close
            defaultSelectedKeys={activeKeys}
            selectedKeys={activeKeys}
            style={{
              backgroundColor: "transparent",
              border: "none",
              paddingLeft: "6px",
              paddingRight: "6px",
            }}
            items={menuItems}
          />
        </Sider>
        <Layout>
          <Content>
            <div className="bg-primary-color px-2 xl:px-5 pb-4 xl:pb-5">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
