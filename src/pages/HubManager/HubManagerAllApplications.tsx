/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import {
  useDeleteHubManagerLoanApplicationMutation,
  useGetAllHubManagerLoanApplicationQuery,
} from "../../redux/features/HubManager/hubManagerApplicationApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminApplicationModal from "../../ui/Modal/AdminApplication/ViewAdminApplicationModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AdminApplicationTable from "../../ui/Tables/AdminApplicationTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const HubManagerAllApplications = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { collapsed } = useAppSelector((state) => state.auth);

  const { data, isFetching } = useGetAllHubManagerLoanApplicationQuery({
    page,
    limit,
    searchTerm: searchText,
    supervisorApproval: "approved",
  });

  const application = data?.data;

  // delete api
  const [deleteLoanApplication] = useDeleteHubManagerLoanApplicationMutation();

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
    setCurrentRecord(null);
  };

  const handleDelete = async () => {
    const res = await tryCatchWrapper(
      deleteLoanApplication,
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
          <p className="text-xl font-semibold">All Applications</p>
          <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
        </div>

        <AdminApplicationTable
          data={application?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
          limit={limit}
          page={page}
          setPage={setPage}
          total={application?.meta?.total}
        />

        <ViewAdminApplicationModal
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
  );
};

export default HubManagerAllApplications;
