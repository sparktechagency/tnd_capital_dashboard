/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { PlusIcon } from "../../Components/svg/leads";
import { useAllLeadsQuery } from "../../redux/features/fieldOfficer/fieldOfficerLeadsApi";
import { useUpdateLeadActionMutation } from "../../redux/features/HubManager/hubManagerLeadsApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewLeadsModal from "../../ui/Modal/AdminModals/ViewLeadsModal";
import BlockModal from "../../ui/Modal/BlockModal";
import EditLeadsModal from "../../ui/Modal/FieldOfficerModals/EditLeadsModal";
import UnblockModal from "../../ui/Modal/UnblockModal";
import FieldOfficerLeadsTable from "../../ui/Tables/FieldOfficerLeadsTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const FieldOfficerNewLeads = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const limit = 12;
  const [filtering, setFiltering] = useState<string>("30");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnBlockModalVisible, setIsUnBlockModalVisible] = useState(false);

  const { collapsed } = useAppSelector((state) => state.auth);

  const { data, isFetching: isLoadingLeads } = useAllLeadsQuery({
    page,
    limit: limit,
    searchTerm: searchText,
    filtering,
  });
  const leads = data?.data;
  const [updateLeadAction] = useUpdateLeadActionMutation();

  //
  //

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showBlockModal = (record: any) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: any) => {
    setCurrentRecord(record);
    setIsUnBlockModalVisible(true);
  };

  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsEditModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnBlockModalVisible(false);
    setCurrentRecord(null);
  };

  const handleBlock = async (data: any) => {
    const res = await tryCatchWrapper(
      updateLeadAction,
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
      updateLeadAction,
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
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
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

        <BlockModal
          isBlockModalVisible={isBlockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
        />
        <UnblockModal
          isUnblockModalVisible={isUnBlockModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleUnblock={handleUnblock}
        />
      </div>
    </div>
  );
};

export default FieldOfficerNewLeads;
