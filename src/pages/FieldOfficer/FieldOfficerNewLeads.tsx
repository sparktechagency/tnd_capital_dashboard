/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { PlusIcon } from "../../Components/svg/leads";
import {
  useAllLeadsQuery,
  useDeleteFieldOfficerLeadsMutation,
} from "../../redux/features/fieldOfficer/fieldOfficerLeadsApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewLeadsModal from "../../ui/Modal/AdminModals/ViewLeadsModal";
import FieldOfficerLeadsTable from "../../ui/Tables/FieldOfficerLeadsTable";
import DaysSelection from "../../utils/DaysSelection";
import EditLeadsModal from "../../ui/Modal/FieldOfficerModals/EditLeadsModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const FieldOfficerNewLeads = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const limit = 12;
  const [filtering, setFiltering] = useState<string>("30");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { collapsed } = useAppSelector((state) => state.auth);

  const { data, isFetching: isLoadingLeads } = useAllLeadsQuery({
    page,
    limit: limit,
    searchTerm: searchText,
    filtering,
  });
  const leads = data?.data;
  const [deleteFieldOfficerLeads] = useDeleteFieldOfficerLeadsMutation();

  const showEditModal = (record: any) => {
    setIsEditModalVisible(true);
    setCurrentRecord(record);
  };
  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async () => {
    const res = await tryCatchWrapper(
      deleteFieldOfficerLeads,
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
          <ReuseButton
            children="Add Leads"
            url="add-new-leads"
            icon={PlusIcon()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
          />
        </div>
      </Topbar>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">All Leads</p>
          <DaysSelection
            currentUser={filtering}
            setCurrentUser={setFiltering}
          />
        </div>

        <FieldOfficerLeadsTable
          data={leads?.result}
          loading={isLoadingLeads}
          showViewModal={showViewUserModal}
          showEditModal={showEditModal}
          showDeleteModal={showDeleteModal}
          limit={limit}
          page={page}
          setPage={setPage}
          total={leads?.meta?.total}
        />

        <ViewLeadsModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />

        <EditLeadsModal
          isEditModalVisible={isEditModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />

        <DeleteModal
          handleDelete={handleDelete}
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default FieldOfficerNewLeads;
