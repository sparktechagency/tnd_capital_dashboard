/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { PlusIcon } from "../../Components/svg/leads";
import {
  useGetAllManagersQuery,
  useUserActionMutation,
} from "../../redux/features/admin/adminUsers/adminUsers";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import BlockModal from "../../ui/Modal/BlockModal";
import ViewHRManager from "../../ui/Modal/HRManagers/ViewHRManagers";
import EditHrOfficerModal from "../../ui/Modal/HROffiers/EditHrOfficer";
import UnblockModal from "../../ui/Modal/UnblockModal";
import HRManagersTable from "../../ui/Tables/HRManagersTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const HRManagers = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [filtering, setFiltering] = useState<string>("30");
  const { collapsed } = useAppSelector((state) => state.auth);

  // api calling
  const { data, isFetching } = useGetAllManagersQuery({
    page: page,
    limit: limit,
    searchTerm: searchText,
    filtering,
  });
  const mangersData = data?.data;
  const [updateUser] = useUserActionMutation();

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };
  const showEditUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const showBlockModal = (record: any) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };

  const showUnblockModal = (record: any) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const handleCancel = () => {
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setIsViewModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentRecord(null);
  };

  const handleBlock = async (data: any) => {
    const res = await tryCatchWrapper(
      updateUser,
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
      updateUser,
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
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}>
        <div className="flex items-center  gap-x-10 py-5">
          <ReuseSearchInput
            placeholder="Search"
            setSearch={setSearchText}
            setPage={setPage}
          />
          <ReuseButton
            children="Add Manager "
            url="/hr/managers/add-manager"
            icon={PlusIcon()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
          />
        </div>
      </Topbar>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">All Managers</p>
          <DaysSelection
            currentUser={filtering}
            setCurrentUser={setFiltering}
          />
        </div>

        <HRManagersTable
          data={mangersData?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showEditUserModal={showEditUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          deleteModalShow={false}
          limit={limit}
          page={page}
          setPage={setPage}
          total={mangersData?.meta?.total}
        />

        <ViewHRManager
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />

        <EditHrOfficerModal
          isEditModalVisible={isEditModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />

        <BlockModal
          isBlockModalVisible={isBlockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
        />

        <UnblockModal
          isUnblockModalVisible={isUnblockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleUnblock={handleUnblock}
        />
      </div>
    </div>
  );
};

export default HRManagers;
