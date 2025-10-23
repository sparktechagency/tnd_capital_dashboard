/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import Topbar from "../../Components/Shared/Topbar";
import { LoanApply } from "../../Components/svg/leads";
import {
  useConfirmRepaymentsMutation,
  useGetAllRepaymentsQuery,
  useTrackingCountsQuery,
} from "../../redux/features/fieldOfficer/fieldOfficerRepaymentApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import Loading from "../../ui/Loading";
import ViewAdminRepaymentsModal from "../../ui/Modal/AdminRepayments/ViewAdminRepaymentsModal";
import EditRepaymentsModal from "../../ui/Modal/FieldOfficerModals/EditRepaymentsModal";
import ConfirmationModal from "../../ui/Modal/User/ConfirmationModal";
import FieldOfficerRepaymentsTable from "../../ui/Tables/FieldOfficerRepaymentsTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const FieldOfficerRepayments = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const { collapsed } = useAppSelector((state) => state.auth);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [filtering, setFiltering] = useState<string>("30");
  // api calling
  const { data, isFetching } = useGetAllRepaymentsQuery({
    page,
    limit,
    searchTerm: searchText,
    filtering,
  });
  const repaymetns = data?.data;

  const [confirmRepayments] = useConfirmRepaymentsMutation();
  const { data: trackingData, isLoading } = useTrackingCountsQuery({});

  const cards = [
    {
      id: 1,
      background: "#FFFFFF",
      name: "Todays Collection",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.collection} className="size-7" alt="icon" />
        </div>
      ),
      count: trackingData?.data?.todayCollection,
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
      count: trackingData?.data?.overdue,
    },
  ];

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };
  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsConfirmVisible(false);
    setIsEditModalVisible(false);
    setCurrentRecord(null);
  };

  const showConfirmModal = (record: any) => {
    setCurrentRecord(record);
    setIsConfirmVisible(true);
  };

  const handelConfirm = async () => {
    const res = await tryCatchWrapper(
      confirmRepayments,
      { params: currentRecord?._id },
      "Confirming..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Topbar collapsed={collapsed}>
        <div className="flex items-center  gap-x-10 py-5">
          <ReuseSearchInput
            placeholder="Search"
            setSearch={setSearchText}
            setPage={setPage}
          />
          <ReuseButton
            children="Repayment"
            url="monthly-repayment"
            icon={LoanApply()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
          />
        </div>
      </Topbar>

      <div className="mt-14">
        <div className="lg:w-[950px] mx-auto">
          <AdminOverviewCard cards={cards} />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">Repayment Table</p>
          <DaysSelection
            currentUser={filtering}
            setCurrentUser={setFiltering}
          />
        </div>

        <FieldOfficerRepaymentsTable
          data={repaymetns?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showConfirmModal={showConfirmModal}
          showEditModal={showEditModal}
          limit={limit}
          page={page}
          setPage={setPage}
          currentRecord={currentRecord}
          total={repaymetns?.meta?.total}
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

        <EditRepaymentsModal
          isEditModalVisible={isEditModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default FieldOfficerRepayments;
