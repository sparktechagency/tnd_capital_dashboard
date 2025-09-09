/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { useDeleteUserMutation } from "../../redux/features/admin/adminUsers/adminUsers";
import { useGetAllHubManagerFieldOfficerQuery } from "../../redux/features/HubManager/hubManagerFieldOfficerApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminFieldOfficerModal from "../../ui/Modal/AdminFieldOfficer/ViewAdminFieldOfficerModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AddSpoke from "../../ui/Modal/HubManager/AddSpoke";
import HubManagerFieldOfficerTable from "../../ui/Tables/HubManagerFieldOfficerTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const HubManagerAllFieldOfficerRequest = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isSpokeModalVisible, setIsSpokeModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { collapsed } = useAppSelector((state) => state.auth);

  // api calling

  const { data, isFetching } = useGetAllHubManagerFieldOfficerQuery({
    page,
    limit,
    searchTerm: searchText,
  });
  const fieldOfficers = data?.data;
  const [deleteUser] = useDeleteUserMutation();


  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showSpokeModal = (record: any) => {
    setCurrentRecord(record);
    setIsSpokeModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsSpokeModalVisible(false);
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
          <p className="text-xl font-semibold">All Request </p>
          <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
        </div>

        <HubManagerFieldOfficerTable
          data={fieldOfficers?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
          showSpokeModal={showSpokeModal}
          isPlusButtonShow={true}
          limit={limit}
          page={page}
          setPage={setPage}
          total={fieldOfficers?.meta?.total}
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

        <AddSpoke
          currentRecord={currentRecord}
          isAddSpokeVisible={isSpokeModalVisible}
          handleCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default HubManagerAllFieldOfficerRequest;
