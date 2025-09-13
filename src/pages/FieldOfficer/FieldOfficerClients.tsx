/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { useGetAllClientsQuery } from "../../redux/features/fieldOfficer/fieldOfficerLoanApplicationApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminClientsModal from "../../ui/Modal/AdminClients/ViewAdminClientsModal";
import FieldOfficerClientsTable from "../../ui/Tables/FieldOfficerClientsTable";
import DaysSelection from "../../utils/DaysSelection";

const FieldOfficerClients = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const limit = 12;
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [filtering, setFiltering] = useState<string>("30");
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const { collapsed } = useAppSelector((state) => state.auth);
  const { data, isFetching } = useGetAllClientsQuery({
    page,
    limit,
    searchTerm: searchText,
    filtering,
  });
  const clients = data?.data as any;

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
        </div>
      </Topbar>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">All Clients</p>
          <DaysSelection
            currentUser={filtering}
            setCurrentUser={setFiltering}
          />
        </div>

        <FieldOfficerClientsTable
          data={clients?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          limit={limit}
          page={page}
          setPage={setPage}
          total={clients?.meta?.total}
        />

        <ViewAdminClientsModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          isPrintButtonShow={true}
        />
      </div>
    </div>
  );
};

export default FieldOfficerClients;
