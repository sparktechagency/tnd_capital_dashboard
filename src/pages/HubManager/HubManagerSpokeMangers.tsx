/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { useGetAllSpokeMangerQuery } from "../../redux/features/HubManager/hubManageSpokeManagerApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewHRManager from "../../ui/Modal/HRManagers/ViewHRManagers";
import EditHrOfficerModal from "../../ui/Modal/HROffiers/EditHrOfficer";
import HRManagersTable from "../../ui/Tables/HRManagersTable";
import DaysSelection from "../../utils/DaysSelection";
import { useUserActionMutation } from "../../redux/features/admin/adminUsers/adminUsers";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import AnalyticsModal from "../../ui/Modal/HRManagers/AnalyticsModal";

const HubManagerSpokeMangers = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [filtering, setFiltering] = useState<string>("30");
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);

  const [isAnalyticsModalVisible, setIsAnalyticsModalVisible] = useState(false);

  const { collapsed } = useAppSelector((state) => state.auth);

  // api calling
  const { data, isFetching } = useGetAllSpokeMangerQuery({
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

  const showAnalyticsModal = (record: any) => {
    setCurrentRecord(record);
    setIsAnalyticsModalVisible(true);
  };

  const handleCancel = () => {
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setIsViewModalVisible(false);
    setIsEditModalVisible(false);
    setIsAnalyticsModalVisible(false);
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
        </div>
      </Topbar>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">Spoke Managers</p>
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
          showAnalyticsModal={showAnalyticsModal}
          limit={limit}
          page={page}
          setPage={setPage}
          total={mangersData?.meta?.total}
          deleteModalShow={false}
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
          handleBlock={handleBlock}
          currentRecord={currentRecord}
        />

        <UnblockModal
          isUnblockModalVisible={isUnblockModalVisible}
          handleCancel={handleCancel}
          handleUnblock={handleUnblock}
          currentRecord={currentRecord}
        />

        <AnalyticsModal
          isAnyalyticsModalOpen={isAnalyticsModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default HubManagerSpokeMangers;
