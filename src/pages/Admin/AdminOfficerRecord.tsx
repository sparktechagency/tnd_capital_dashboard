/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminOfficerRecord from "../../ui/Modal/OfficerRecord/ViewAdminOfficerRecord";
import AdminOfficerRecordTable from "../../ui/Tables/AdminOfficerRecordTable";
import DaysSelection from "../../utils/DaysSelection";
import { fieldOfficerData } from "./fakeData";

const AdminOfficerRecord = () => {
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
        </div>
      </Topbar>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">Field Officer Record</p>
          <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
        </div>

        <AdminOfficerRecordTable
          data={fieldOfficerData}
          loading={false}
          showViewModal={showViewUserModal}
          limit={limit}
          page={page}
          setPage={setPage}
        />

        <ViewAdminOfficerRecord
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminOfficerRecord;
