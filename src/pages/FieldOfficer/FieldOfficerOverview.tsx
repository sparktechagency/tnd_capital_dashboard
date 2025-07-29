/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import Bar_Chart from "../../Components/Chart/BarChart";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ViewFieldOfficerCollectionModal from "../../ui/Modal/AdminModals/FieldOfficerCollectionModal/ViewFieldOfficerCollectionModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import FieldOfficerLeadsTable from "../../ui/Tables/FieldOfficerLeadsTable";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import YearOption from "../../utils/YearOption";
import { fieldOfficerData } from "../Admin/fakeData";

const cards = [
  {
    id: 1,
    background: "#FFFFFF",
    name: "Total Collection",
    icon: (
      <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
        <img src={AllIcons.collection} className="size-7" alt="icon" />
      </div>
    ),
    count: "$2,000",
  },
  {
    id: 2,
    background: "#FFFFFF",
    name: "Total Application",
    icon: (
      <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
        <img src={AllIcons.application} className="size-7" alt="icon" />
      </div>
    ),
    count: "100",
  },
  {
    id: 3,
    background: "#FFFFFF",
    name: "Overdue",
    icon: (
      <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
        <img src={AllIcons.overdue} className="size-7" alt="icon" />
      </div>
    ),
    count: "$2,000K",
  },
  {
    id: 3,
    background: "#FFFFFF",
    name: "Total Clients",
    icon: (
      <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
        <img src={AllIcons.clients} className="size-7" alt="icon" />
      </div>
    ),
    count: "806",
  },
];

const FieldOfficerOverview = () => {
  const [page, setPage] = useState(1);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const { collapsed } = useAppSelector((state) => state.auth);

  console.log(isEditModalVisible);
  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentRecord(null);
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
    <section>
      <Topbar collapsed={collapsed}></Topbar>
      <div className="mt-6">
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
          <AdminOverviewCard cards={cards} className="" />
        </div>

        <div className="shadow-lg w-full border border-[#ddd] rounded-xl p-4">
          <div className="flex items-center justify-between py-4">
            <p className="text-xl font-medium">Total Leads</p>
            <YearOption currentYear={2025} setThisYear={() => {}} key={""} />
          </div>
          <Bar_Chart />
        </div>

        <p className="text-2xl font-medium mt-10">Recent Leads</p>
        <div className="shadow-lg w-full border border-[#ddd] rounded-xl mt-5">
          <FieldOfficerLeadsTable
            loading={false}
            showViewModal={showViewUserModal}
            showEditModal={showEditModal}
            showDeleteModal={showDeleteModal}
            limit={limit}
            data={fieldOfficerData}
            page={page}
            setPage={setPage}
            total={0}
          />

          <ViewFieldOfficerCollectionModal
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />

          <DeleteModal
            handleDelete={handleDelete}
            isDeleteModalVisible={isDeleteModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        </div>
      </div>
    </section>
  );
};

export default FieldOfficerOverview;
