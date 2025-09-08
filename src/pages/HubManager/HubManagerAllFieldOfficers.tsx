/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { useGetAllFieldOfficersQuery } from "../../redux/features/HubManager/hubManagerFieldOfficerApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminFieldOfficerModal from "../../ui/Modal/AdminFieldOfficer/ViewAdminFieldOfficerModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import HubManagerFieldOfficerTable from "../../ui/Tables/HubManagerFieldOfficerTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Loading from "../../ui/Loading";
import EditHrOfficerModal from "../../ui/Modal/HROffiers/EditHrOfficer";
import { useDeleteUserMutation } from "../../redux/features/admin/adminUsers/adminUsers";

const HubManagerAllFieldOfficers = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  console.log(searchText);
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { collapsed } = useAppSelector((state) => state.auth);

  // api calling
  const { data, isLoading } = useGetAllFieldOfficersQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const officerData = data?.data;
  const [deleteUser] = useDeleteUserMutation();

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };
  const showEditUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async () => {
    const res = await tryCatchWrapper(
      deleteUser,
      { params: currentRecord?._id },
      "Deleting..."
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
        </div>
      </Topbar>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">All Field Officers </p>
          <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
        </div>

        <HubManagerFieldOfficerTable
          data={officerData?.result}
          loading={false}
          showViewModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
          showEditUserModal={showEditUserModal}
          isPenIconShow={true}
          limit={limit}
          page={page}
          setPage={setPage}
          total={officerData?.meta?.total}
        />

        <ViewAdminFieldOfficerModal
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

        <EditHrOfficerModal
          isEditModalVisible={isEditModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default HubManagerAllFieldOfficers;
