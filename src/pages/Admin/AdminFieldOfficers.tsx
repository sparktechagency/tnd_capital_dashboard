/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { FieldOfficer } from "../../Components/svg/leads";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUserActionMutation,
} from "../../redux/features/admin/adminUsers/adminUsers";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminFieldOfficerModal from "../../ui/Modal/AdminFieldOfficer/ViewAdminFieldOfficerModal";
import BlockModal from "../../ui/Modal/BlockModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import AdminFieldOfficerTable from "../../ui/Tables/AdminFieldOfficerTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminFieldOfficers = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const { collapsed } = useAppSelector((state) => state.auth);

  // api calls
  const { data, isFetching } = useGetUsersQuery({
    page,
    limit,
    searchTerm: searchText,
    role: "fieldOfficer",
  });

  const fieldOfficerData = data?.data;

  const [userAction] = useUserActionMutation();
  const [deleteUser] = useDeleteUserMutation();

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
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };

  const showBlockModal = (record: any) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: any) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
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

  const handleBlock = async (data: any) => {
    const res = await tryCatchWrapper(
      userAction,
      {
        body: {
          action: "blocked",
        },
        params: data?._id,
      },
      "Blocking..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  const handleUnblock = async (data: any) => {
    const res = await tryCatchWrapper(
      userAction,
      {
        body: {
          action: "active",
        },
        params: data?._id,
      },
      "Unblocking..."
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
            children="Officer Information "
            url="/admin/field-officers/officer-information"
            icon={FieldOfficer()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
          />
        </div>
      </Topbar>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">All Field Officers</p>
          <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
        </div>

        <AdminFieldOfficerTable
          data={fieldOfficerData?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          limit={limit}
          page={page}
          setPage={setPage}
          total={fieldOfficerData?.meta?.total}
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
        <BlockModal
          currentRecord={currentRecord}
          isBlockModalVisible={isBlockModalVisible}
          handleCancel={handleCancel}
          handleBlock={handleBlock}
        />

        <UnblockModal
          currentRecord={currentRecord}
          isUnblockModalVisible={isUnblockModalVisible}
          handleCancel={handleCancel}
          handleUnblock={handleUnblock}
        />
      </div>
    </div>
  );
};

export default AdminFieldOfficers;
