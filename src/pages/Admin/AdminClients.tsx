/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import {
  useDeleteClientsMutation,
  useGetAllClientsQuery,
} from "../../redux/features/admin/adminClients/adminClientsApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminClientsModal from "../../ui/Modal/AdminClients/ViewAdminClientsModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AdminClientsTable from "../../ui/Tables/AdminClientsTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminClients = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  console.log(searchText);
  const limit = 12;
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [filtering, setFiltering] = useState<string>("30");

  const { collapsed } = useAppSelector((state) => state.auth);

  // api calling

  const { data: adminClients, isLoading } = useGetAllClientsQuery({
    page,
    limit,
    searchTerm: searchText,
    filtering,
  });

  const clients = adminClients?.data;

  const [deleteClients] = useDeleteClientsMutation();

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
      deleteClients,
      { params: currentRecord?.client?._id },
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
          <p className="text-xl font-semibold">All Clients</p>
          <DaysSelection
            currentUser={filtering}
            setCurrentUser={setFiltering}
          />
        </div>

        <AdminClientsTable
          data={clients?.result}
          loading={isLoading}
          showViewModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
          limit={limit}
          page={page}
          setPage={setPage}
          total={clients?.meta?.total}
        />

        <ViewAdminClientsModal
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

export default AdminClients;
