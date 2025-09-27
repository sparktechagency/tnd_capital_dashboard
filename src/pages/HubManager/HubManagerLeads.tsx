/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import LeadsTable from "../../ui/Tables/LoadsTable";
import DaysSelection from "../../utils/DaysSelection";

import {
  useGetHubManagerAllLeadsQuery,
  useUpdateLeadActionMutation,
} from "../../redux/features/HubManager/hubManagerLeadsApi";
import ViewLoadsModal from "../../ui/Modal/AdminLoads/ViewLoadsModal";
import BlockModal from "../../ui/Modal/BlockModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import UnblockModal from "../../ui/Modal/UnblockModal";

const HubManagerLeads = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnBlockModalVisible, setIsUnBlockModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [filtering, setFiltering] = useState<string>("30");
  const { collapsed } = useAppSelector((state) => state.auth);

  // api calling

  const { data: leads, isFetching } = useGetHubManagerAllLeadsQuery({
    page,
    limit,
    searchTerm: searchText,
    filtering,
  });

  const allLeads = leads?.data as any;

  const [updateLeadAction] = useUpdateLeadActionMutation();

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

  const handleCancel = () => {
    setIsViewModalVisible(false);
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

        <LeadsTable
          data={allLeads?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
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

export default HubManagerLeads;
