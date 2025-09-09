/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { LoanApply } from "../../Components/svg/leads";
import { useGetAllLoanApplicationQuery } from "../../redux/features/fieldOfficer/fieldOfficerLoanApplicationApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminApplicationModal from "../../ui/Modal/AdminApplication/ViewAdminApplicationModal";
import AdminApplicationTable from "../../ui/Tables/AdminApplicationTable";
import DaysSelection from "../../utils/DaysSelection";

const FieldOfficerApplications = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { collapsed } = useAppSelector((state) => state.auth);

  // api calling
  const { data, isFetching } = useGetAllLoanApplicationQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const applicationData = data?.data;

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
            children="Loan Apply "
            url="loan-apply"
            icon={LoanApply()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
          />
        </div>
      </Topbar>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">All Applications</p>
          <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
        </div>

        <AdminApplicationTable
          data={applicationData?.result}
          loading={isFetching}
          deleteModalShow={false}
          showViewModal={showViewUserModal}
          limit={limit}
          page={page}
          setPage={setPage}
          total={applicationData?.meta?.total}
        />

        <ViewAdminApplicationModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default FieldOfficerApplications;
