import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import Topbar from "../../../Components/Shared/Topbar";
import { useAppSelector } from "../../../redux/hooks";
import ChangePasswordModal from "../../../ui/Modal/User/ChangePasswordModal";

const Settings = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const { role } = useAppSelector((state) => state.role);

  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState<boolean>(false);

  const items = [
    {
      title: "Personal Information",
      link: `/${role}/settings/profile`,
    },

    {
      title: "Support",
      link: `/${role}/settings/support`,
    },
  ];

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed} />

      <div className="mx-auto mt-10">
        {items.map((item, index) => (
          <Link to={item.link} key={index}>
            <div className="bg-[#F5F5F5] rounded-md mb-2">
              <div className="flex justify-between items-center px-4 py-4 cursor-pointer">
                <span className="text-gray-700 font-medium">{item.title}</span>
                <BsChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </Link>
        ))}
        <div
          onClick={() => setChangePasswordModalVisible(true)}
          className="bg-[#F5F5F5] rounded-md mb-2 cursor-pointer"
        >
          <div className="flex justify-between items-center px-4 py-4 cursor-pointer">
            <span className="text-gray-700 font-medium">Change Password</span>
            <BsChevronRight className="w-5 h-5 text-gray-500" />
          </div>
        </div>
        <ChangePasswordModal
          isChangePasswordModalVisible={changePasswordModalVisible}
          handleCancel={() => setChangePasswordModalVisible(false)}
        />
      </div>
    </div>
  );
};

export default Settings;
