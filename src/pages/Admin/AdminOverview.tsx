/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllImages } from "../../../public/images/AllImages";
import Area_Chart from "../../Components/Chart/AreaChart";
import MultiRingChart from "../../Components/Chart/MultiRingChart";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import FieldOfficerTable from "../../ui/Tables/FieldOfficerCollectionTable";
import YearOption from "../../utils/YearOption";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { fieldOfficerData } from "./fakeData";

const chartData = [
  { month: "Jan", totalPresent: 35 },
  { month: "Feb", totalPresent: 42 },
  { month: "Mar", totalPresent: 38 },
  { month: "Apr", totalPresent: 50 },
  { month: "May", totalPresent: 47 },
  { month: "Jun", totalPresent: 53 },
  { month: "Jul", totalPresent: 58 },
  { month: "Aug", totalPresent: 60 },
  { month: "Sep", totalPresent: 55 },
  { month: "Oct", totalPresent: 62 },
  { month: "Nov", totalPresent: 59 },
  { month: "Dec", totalPresent: 65 },
];

const data = [
  { label: "Rejected", color: "bg-purple-700", percent: 75 },
  { label: "Pending", color: "bg-green-500", percent: 25 },
];

const AdminOverview = () => {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const limit = 12;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record: any) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: any) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
    setIsEditModalVisible(false);
    setIsViewModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    // setCurrentRecord(null);
  };

  const handleBlock = async (data: any) => {
    const res = await tryCatchWrapper(
      // userAction,
      {
        body: {
          userId: data?._id,
          action: "blocked",
        },
      },
      "Blocking..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  const handleUnblock = async (data: any) => {
    const res = await tryCatchWrapper(
      // userAction,
      {
        body: {
          userId: data?._id,
          action: "active",
        },
      },
      "Unblocking..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  const handleDelete = async () => {
    const res = await tryCatchWrapper(
      // deleteAdmin,
      { params: currentRecord?._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <img
          src={AllImages.profile}
          alt="profile_pic"
          style={{ width: "60px", height: "60px", marginRight: "10px" }}
          className="rounded-full border border-secondary-color"
        />
        <div className="flex flex-col justify-center">
          <p className="font-semibold text-xl">Hello, Emma Taylor</p>
          <p className="text-lg font-normal">
            Check your activities in this dashboard.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <AdminOverviewCard />
      </div>
      <div className="flex items-center justify-between gap-x-8">
        <div className="shadow-lg w-full border border-[#ddd] rounded-xl p-4">
          <div className="flex items-center justify-between py-4">
            <p className="text-xl font-medium">Collection Report</p>
            <YearOption currentYear={2025} setThisYear={() => {}} key={""} />
          </div>
          <Area_Chart chartData={chartData} />
        </div>
        <div className="shadow-lg w-[700px] border border-[#ddd] rounded-xl p-4">
          <div className="flex items-center justify-between py-4">
            <p className="text-xl font-medium">Loan Approval</p>
            <YearOption currentYear={2025} setThisYear={() => {}} key={""} />
          </div>
          <div className="flex items-center justify-between pr-4">
            <MultiRingChart />
            <div>
              <div className="space-y-6">
                {data.map((item, index) => (
                  <div key={index} className="flex flex-col items-start">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`w-3 h-3 rounded-full ${item.color}`}
                      ></span>
                      <span className="text-gray-500 text-sm">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-purple-900">
                      {item.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-lg w-full border border-[#ddd] rounded-xl mt-5">
        <FieldOfficerTable
          isShowOtherAction={false}
          loading={false}
          showBlockModal={showBlockModal}
          showEditModal={showEditModal}
          showUnblockModal={showUnblockModal}
          showViewModal={showViewUserModal}
          limit={10}
          data={fieldOfficerData}
          page={1}
          setPage={setPage}
          total={0}
        />
      </div>
    </div>
  );
};

export default AdminOverview;
