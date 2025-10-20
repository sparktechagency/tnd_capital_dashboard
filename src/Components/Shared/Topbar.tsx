import { Image } from "antd";
import { Header } from "antd/es/layout/layout";
import { ReactNode } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import { useGetProfileQuery } from "../../redux/features/auth/authApi";
import { setCollapsed } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getImageUrl } from "../../helpers/config/envConfig";

// Define the types for the component props
interface TopbarProps {
  collapsed: boolean;
  children?: ReactNode;
  // setCollapsed: (collapsed: boolean) => void;
}

const Topbar: React.FC<TopbarProps> = ({ collapsed, children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { role } = useAppSelector((state) => state.role);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = useGetProfileQuery({});

  console.log(data?.data, "profiledata");

  return (
    <Header
      style={{
        background: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 999,
        marginLeft: 0,
        padding: 0,
      }}
      className=""
    >
      <div className="flex justify-between gap-0 items-center bg-white px-4 py-2 w-full lg:gap-x-0 gap-x-5">
        <div className="flex items-center gap-2 text-base-color ">
          <IoMenuSharp
            onClick={() => dispatch(setCollapsed(!collapsed))}
            className="text-3xl !text-black cursor-pointer"
          />
        </div>

        <div>{children}</div>

        <div className="flex items-center justify-between gap-2">
          <div
            onClick={() => navigate(`/${role}/notification`)}
            className="flex items-center justify-center cursor-pointer"
          >
            <Image
              src={AllIcons.notification}
              width={30}
              height={30}
              alt="logo"
              preview={false}
            />
          </div>

          <div className="flex items-center justify-center gap-0 bg-white text-base-color rounded-lg  px-2 py-1 ">
            <img
              src={
                data?.data?.customFields?.image
                  ? getImageUrl() + data?.data?.customFields?.image
                  : AllImages.profile
              }
              alt="profile_pic"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
              className="rounded-full border border-secondary-color"
            />
            <div className="flex flex-col justify-center">
              <p className="text-base-color font-semibold text-sm">
                {data?.data?.customFields?.name || "N/A"}
              </p>
              <p className="text-base-color text-xs capitalize">
                {data?.data?.role || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Topbar;
