/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { PlusIcon } from "../../Components/svg/leads";
import {
  useGetUsersQuery,
  useUserActionMutation
} from "../../redux/features/admin/adminUsers/adminUsers";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import BlockModal from "../../ui/Modal/BlockModal";
import EditHrOfficerModal from "../../ui/Modal/HROffiers/EditHrOfficer";
import ViewHROfficers from "../../ui/Modal/HROffiers/ViewHROfficers";
import UnblockModal from "../../ui/Modal/UnblockModal";
import HROfficersTable from "../../ui/Tables/HROfficersTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const HROfficers = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const limit = 12;
  const [filtering, setFiltering] = useState<string>("30");
  const [isViewModalVisible, setIsViewModalVisible] = useState<boolean>(false);
  const [isBloackModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);

  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);

  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { collapsed } = useAppSelector((state) => state.auth);

  // api calls
  const { data, isFetching } = useGetUsersQuery({
    page,
    limit,
    searchTerm: searchText,
    role: "fieldOfficer",
    filtering,
  });

  const fieldOfficerData = data?.data;

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
    <div>
      <Topbar collapsed={collapsed}>
        <div className="flex items-center  gap-x-10 py-5">
          <ReuseSearchInput
            placeholder="Search"
            setSearch={setSearchText}
            setPage={setPage}
          />
          <ReuseButton
            children="Add Officer "
            url="/hr/officers/add-officers"
            icon={PlusIcon()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
          />
        </div>
      </Topbar>

      <div className="mt-14 min-h-screen">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">Field Officers</p>
          <DaysSelection
            currentUser={filtering}
            setCurrentUser={setFiltering}
          />
        </div>

        <HROfficersTable
          data={fieldOfficerData?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          showEditUserModal={showEditUserModal}
          limit={limit}
          page={page}
          setPage={setPage}
          total={fieldOfficerData?.meta?.total}
        />

        <ViewHROfficers
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
          isBlockModalVisible={isBloackModalVisible}
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
        
      </div>
    </div>
  );
};

export default HROfficers;
