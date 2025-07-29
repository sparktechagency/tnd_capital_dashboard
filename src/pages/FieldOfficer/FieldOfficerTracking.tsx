/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminRepaymentsModal from "../../ui/Modal/AdminRepayments/ViewAdminRepaymentsModal";
import FieldOfficerTrackingRepaymentsTable from "../../ui/Tables/FieldOfficerTrackingRepaymentsTable";
import DaysSelection from "../../utils/DaysSelection";
import { installmentData } from "../Admin/fakeData";
import ConfirmationModal from "../../ui/Modal/User/ConfirmationModal";

const FieldOfficerTracking = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  console.log(searchText);
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { collapsed } = useAppSelector((state) => state.auth);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showConfirmModal = (record: any) => {
    setCurrentRecord(record);
    setIsConfirmVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsConfirmVisible(false);
    setCurrentRecord(null);
  };

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
  ];

  const handelConfirm = () => {
    console.log("confirm");
  };

  return (
    <div>
      <Topbar collapsed={collapsed}>
        <div className="flex items-center  gap-x-10 py-5">
          <ReuseSearchInput
            placeholder="Search"
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </Topbar>

      <div className="mt-14">
        <div className="lg:w-[950px] mx-auto">
          <AdminOverviewCard cards={cards} />
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">Repayment Table</p>
          <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
        </div>

        <FieldOfficerTrackingRepaymentsTable
          data={installmentData}
          loading={false}
          showViewModal={showViewUserModal}
          showConfirmModal={showConfirmModal}
          limit={limit}
          page={page}
          setPage={setPage}
        />

        <ViewAdminRepaymentsModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />

        <ConfirmationModal
          currentRecord={currentRecord}
          isConfirmationModalVisible={isConfirmVisible}
          handleCancel={handleCancel}
          handleAccept={handelConfirm}
        />
      </div>
    </div>
  );
};

export default FieldOfficerTracking;
