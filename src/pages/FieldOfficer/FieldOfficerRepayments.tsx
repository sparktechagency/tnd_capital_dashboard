/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { LoanApply } from "../../Components/svg/leads";
import {
  useConfirmRepaymentsMutation,
  useGetAllRepaymentsQuery,
} from "../../redux/features/fieldOfficer/fieldOfficerRepaymentApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminRepaymentsModal from "../../ui/Modal/AdminRepayments/ViewAdminRepaymentsModal";
import FieldOfficerRepaymentsTable from "../../ui/Tables/FieldOfficerRepaymentsTable";
import DaysSelection from "../../utils/DaysSelection";
import ConfirmationModal from "../../ui/Modal/User/ConfirmationModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const FieldOfficerRepayments = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  console.log(searchText);
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const { collapsed } = useAppSelector((state) => state.auth);

  // api calling
  const { data } = useGetAllRepaymentsQuery({
    page,
    limit,
    searchTerm: searchText,
  });
  const repaymetns = data?.data;

  const [confirmRepayments] = useConfirmRepaymentsMutation();

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsConfirmVisible(false);
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
            children="Re-Payment"
            url="monthly-re-payment"
            icon={LoanApply()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
          />
        </div>
      </Topbar>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">Repayment Table</p>
          <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
        </div>

        <FieldOfficerRepaymentsTable
          data={repaymetns?.result}
          loading={false}
          showViewModal={showViewUserModal}
          showConfirmModal={showConfirmModal}
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
      </div>
    </div>
  );
};

export default FieldOfficerRepayments;
