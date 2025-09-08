/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import { useGetAllSpokeMangerQuery } from "../../redux/features/HubManager/hubManageSpokeManagerApi";
import Loading from "../../ui/Loading";
import ViewHRManager from "../../ui/Modal/HRManagers/ViewHRManagers";
import EditHrOfficerModal from "../../ui/Modal/HROffiers/EditHrOfficer";
import HRManagersTable from "../../ui/Tables/HRManagersTable";
import DaysSelection from "../../utils/DaysSelection";

const HubManagerSpokeMangers = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  console.log(searchText);
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const { collapsed } = useAppSelector((state) => state.auth);

  // api calling
  const { data, isLoading } = useGetAllSpokeMangerQuery({
    page: 1,
    limit: 10,
  });
  const mangersData = data?.data;

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };
  const showEditUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentRecord(null);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen">
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
          <p className="text-xl font-semibold">Spoke Managers</p>
          <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
        </div>

        <HRManagersTable
          data={mangersData?.result}
          loading={false}
          showViewModal={showViewUserModal}
          showEditUserModal={showEditUserModal}
          limit={limit}
          page={page}
          setPage={setPage}
          total={mangersData?.meta?.total}
          deleteModalShow={false}
        />

        <ViewHRManager
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />

        <EditHrOfficerModal
          isEditModalVisible={isEditModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default HubManagerSpokeMangers;
