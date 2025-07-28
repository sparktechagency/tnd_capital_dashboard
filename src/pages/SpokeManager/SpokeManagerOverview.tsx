/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ViewFieldOfficerCollectionModal from "../../ui/Modal/AdminModals/FieldOfficerCollectionModal/ViewFieldOfficerCollectionModal";
import FieldOfficerTable from "../../ui/Tables/FieldOfficerCollectionTable";

import { fieldOfficerData } from "../Admin/fakeData";
import YearOption from "../../utils/YearOption";
import Bar_Chart from "../../Components/Chart/BarChart";

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
];

const SpokeManagerOverview = () => {
  const [page, setPage] = useState(1);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const { collapsed } = useAppSelector((state) => state.auth);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
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
          <AdminOverviewCard cards={cards} subClassName="justify-center" />
        </div>
        <div className="shadow-lg w-full border border-[#ddd] rounded-xl p-4">
          <div className="flex items-center justify-between py-4">
            <p className="text-xl font-medium">Collection Report</p>
            <YearOption currentYear={2025} setThisYear={() => {}} key={""} />
          </div>
          <Bar_Chart />
        </div>
        <p className="text-lg font-medium pt-6 ">All Field Officer Collection</p>
        <div className="shadow-lg w-full border border-[#ddd] rounded-xl mt-5">
          <FieldOfficerTable
            isShowOtherAction={false}
            loading={false}
            showViewModal={showViewUserModal}
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
        </div>
      </div>
    </section>
  );
};

export default SpokeManagerOverview;
