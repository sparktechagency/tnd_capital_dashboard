/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, Switch, Tooltip } from "antd";
import { useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import Topbar from "../../Components/Shared/Topbar";
import { PlusIcon } from "../../Components/svg/leads";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import AddAdminLoan from "../../ui/Modal/AdminLoan/AddAdminLoan";
import EditAdminLoan from "../../ui/Modal/AdminLoan/EditAdminLoan";
import DeleteModal from "../../ui/Modal/DeleteModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { loanData } from "./fakeData";
import {
  useDeleteLoansMutation,
  useGetAllLoansQuery,
} from "../../redux/features/admin/adminLoan/adminLoanApi";
import Loading from "../../ui/Loading";

const AdminLone = () => {
  const { collapsed } = useAppSelector((state) => state.auth);

  const [isAddFeaturesModalOpen, setIsAddFeaturesModalOpen] =
    useState<boolean>(false);
  const [isDeleteModalVisible, setisDeleteModalVisible] =
    useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);

  const handleCancel = () => {
    setIsAddFeaturesModalOpen(false);
    setisDeleteModalVisible(false);
    setIsEditModalVisible(false);
  };

  const [loanList, setLoanList] = useState(loanData); // copy props if needed

  const handleToggle = (id: string, checked: any) => {
    const updatedSubs = loanList.map((item) =>
      item._id === id ? { ...item, isActive: checked } : item
    );
    setLoanList(updatedSubs);
  };

  // api calling
  const { data: loans, isLoading } = useGetAllLoansQuery({});
  const [deleteLoan] = useDeleteLoansMutation();

  const handleDelete = async () => {
    const res = await tryCatchWrapper(
      deleteLoan,
      { params: currentRecord?._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}>
        <div className="lg:ml-[1000px]">
          <ReuseButton
            children="Add Features"
            onClick={() => setIsAddFeaturesModalOpen(true)}
            icon={PlusIcon()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
          />
        </div>
      </Topbar>

      <div className="mt-10 ">
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-x-10 gap-y-5 ">
          {loans?.data?.map((data: any, index: number) => {
            return (
              <div
                key={index}
                className="rounded-xl shadow-lg p-5 border border-[#dddddd57]"
              >
                {/* Top-right action buttons */}
                <div className=" flex items-center justify-end gap-2">
                  <Tooltip title={data.isActive ? "Active" : "Inactive"}>
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: !data.isActive ? "#ddd" : "#000",
                        },
                      }}
                    >
                      <Switch
                        checked={data.isActive}
                        onChange={(checked) => handleToggle(data._id, checked)}
                        size="small"
                        className="custom-yellow-switch"
                      />
                    </ConfigProvider>
                  </Tooltip>
                  <div
                    onClick={() => {
                      setCurrentRecord(data);
                      setisDeleteModalVisible(true);
                    }}
                    className="p-1 rounded-full cursor-pointer hover:bg-gray-100"
                  >
                    <img src={AllIcons.deleteIcon} alt="" />
                  </div>
                  <div
                    onClick={() => {
                      setCurrentRecord(data);
                      setIsEditModalVisible(true);
                    }}
                    className="p-1 rounded-full cursor-pointer hover:bg-gray-100"
                  >
                    <img src={AllIcons.pen} alt="" />
                  </div>
                </div>

                <div className="my-4 px-10">
                  <p className="text-xl font-medium">{data.title}</p>
                  <ul
                    style={{
                      listStyleType: "numeric",
                    }}
                    className="space-y-1.5 mt-4 ml-4"
                  >
                    {data.features.map((feature: any, index: number) => (
                      <li key={index} className="text-sm ">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <AddAdminLoan
          handleCancel={handleCancel}
          isViewModalVisible={isAddFeaturesModalOpen}
        />

        <EditAdminLoan
          handleCancel={handleCancel}
          isEditAdminLoanModalVisible={isEditModalVisible}
          currentRecord={currentRecord}
        />

        <DeleteModal
          currentRecord={currentRecord}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
          isDeleteModalVisible={isDeleteModalVisible}
        />
      </div>
    </div>
  );
};

export default AdminLone;
