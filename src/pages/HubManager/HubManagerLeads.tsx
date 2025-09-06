/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import DeleteModal from "../../ui/Modal/DeleteModal";
import LeadsTable from "../../ui/Tables/LoadsTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

import {
  useDeleteLeadsMutation,
  useGetHubManagerAllLeadsQuery,
} from "../../redux/features/HubManager/hubManagerLeadsApi";
import ViewLoadsModal from "../../ui/Modal/AdminLoads/ViewLoadsModal";
import Loading from "../../ui/Loading";

const HubManagerLeads = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { collapsed } = useAppSelector((state) => state.auth);

  // api calling

  const { data: leads, isFetching } = useGetHubManagerAllLeadsQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const allLeads = leads?.data;

  const [deleteLeads] = useDeleteLeadsMutation();

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
      deleteLeads,
      { params: currentRecord?._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  if (isFetching) return <Loading />;

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
          <p className="text-xl font-semibold">All Leads</p>
          <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
        </div>

        <LeadsTable
          data={allLeads?.result}
          loading={false}
          showViewModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
          limit={limit}
          page={page}
          setPage={setPage}
          total={allLeads?.meta?.total}
        />

        <ViewLoadsModal
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

export default HubManagerLeads;
