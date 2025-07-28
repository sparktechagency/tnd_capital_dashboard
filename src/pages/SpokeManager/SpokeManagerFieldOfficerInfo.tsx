/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import ViewSpokeManagerFieldOfficer from "../../ui/Modal/SpokeManagerFieldOfficer/ViewSpokeManagerFieldOfficer";
import SpokeManagerFieldOfficerTable from "../../ui/Tables/SpokeManagerFieldOfficerTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { spokeManagerFieldOfficerData } from "../Admin/fakeData";

const SpokeManagerFieldOfficerInfo = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  console.log(searchText);
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    // setCurrentRecord(null);
  };

  const handleDelete = async () => {
    const res = await tryCatchWrapper(
      // deleteAdmin,
      { params: currentRecord?._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  return (
    <section className="min-h-screen">
      <Topbar collapsed={collapsed}>
        <div className="flex items-center  gap-x-10 py-5">
          <ReuseSearchInput
            placeholder="Search"
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </Topbar>
      <div>
        <div className="mt-14">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xl font-semibold">All Field Officers</p>
            <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
          </div>

          <SpokeManagerFieldOfficerTable
            data={spokeManagerFieldOfficerData}
            loading={false}
            showViewModal={showViewUserModal}
            showDeleteModal={showDeleteModal}
            limit={limit}
            page={page}
            setPage={setPage}
          />

          <ViewSpokeManagerFieldOfficer
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />

          <DeleteModal
            currentRecord={currentRecord}
            isDeleteModalVisible={isDeleteModalVisible}
            handleCancel={handleDeleteCancel}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </section>
  );
};

export default SpokeManagerFieldOfficerInfo;
