import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import logout from "../../../public/images/dashboard-logo/logout.svg";
import getActiveKeys from "../../utils/activeKey";
import { adminPaths } from "../../Routes/admin.route";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import Sider from "antd/es/layout/Sider";
import Topbar from "../Shared/Topbar";
import { AllImages } from "../../../public/images/AllImages";
import { schoolAdminPaths } from "../../Routes/schoolAdmin.route";
import useUserData from "../../hooks/useUserData";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearAuth, setCollapsed } from "../../redux/features/auth/authSlice";
import Cookies from "js-cookie";

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  // const userRole = useUserData();
  const location = useLocation();
  const userRole = useAppSelector((state) => state.role);
  const { collapsed } = useAppSelector((state) => state.auth);

  console.log(userRole);

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const rootSubmenuKeys = [
    "orders",
    "service",
    "customer-feedBack",
    "settings",
  ];

  // const handleLogout = () => {
  //   dispatch(clearAuth());
  //   Cookies.remove("classaty_accessToken");
  //   window.location.href = "/sign-in";
  //   window.location.reload();
  // };

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

  // const [collapsed, setCollapsed] = useState(false);
  // const dispatch = useAppDispatch();

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
  const menuItems =
    userRole?.role === "admin"
      ? sidebarItemsGenerator(adminPaths, "admin")
      : sidebarItemsGenerator(schoolAdminPaths, userRole?.role as string);

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
    label: (
      <div
      // onClick={handleLogout}
      >
        <NavLink to="/sign-in">Logout</NavLink>
      </div>
    ),
  });

  return (
    <div className="h-screen bg-primary-color ">
      <ScrollRestoration />

      <Layout className="flex !bg-primary-color">
        <Sider
          theme="light"
          width={300}
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
          {/* <Header
            style={{
              background: "#ffffff",
              position: "sticky",
              top: 0,
              zIndex: 999,
              marginLeft: 0,
            }}
            className="!px-5"
          >
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header> */}
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
