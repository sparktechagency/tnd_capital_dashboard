/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AdminLocationProfileTable from "../../ui/Tables/AdminLocationProfileTable";
import { fieldOfficerData } from "./fakeData";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DaysSelection from "../../utils/DaysSelection";
import ViewAdminManagerModal from "../../ui/Modal/AdminManager/ViewAdminManagerModal";
import EditManagerInfoModal from "../../ui/Modal/AdminManager/EditManagerInfoModal";

const AdminLocationProfile = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const [searchText, setSearchText] = useState<string>("");
  console.log(searchText);

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  console.log(currentRecord);
  const { collapsed } = useAppSelector((state) => state.auth);

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
          <p className="text-xl font-semibold">Location Profile</p>
          <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
        </div>
        <AdminLocationProfileTable
          loading={false}
          limit={limit}
          data={fieldOfficerData}
          showViewModal={showViewUserModal}
          showEditModal={showEditUserModal}
          page={page}
          setPage={setPage}
          total={0}
        />

        <ViewAdminManagerModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />

        <EditManagerInfoModal
          isEditManagerOpen={isEditModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminLocationProfile;
