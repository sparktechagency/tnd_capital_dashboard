/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import ViewAdminRepaymentsModal from "../../ui/Modal/AdminRepayments/ViewAdminRepaymentsModal";
import Topbar from "../../Components/Shared/Topbar";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DaysSelection from "../../utils/DaysSelection";
import { installmentData } from "../Admin/fakeData";
import FieldOfficerRepaymentsTable from "../../ui/Tables/FieldOfficerRepaymentsTable";
import ReuseButton from "../../ui/Button/ReuseButton";
import { LoanApply } from "../../Components/svg/leads";

const FieldOfficerRepayments = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  console.log(searchText);
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
          data={installmentData}
          loading={false}
          showViewModal={showViewUserModal}
          limit={limit}
          page={page}
          setPage={setPage}
        />

        <ViewAdminRepaymentsModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default FieldOfficerRepayments;
