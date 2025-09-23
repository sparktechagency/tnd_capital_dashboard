/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Topbar from "../../Components/Shared/Topbar";
import {
  useApplicationActionMutation,
  useGetAllHubManagerLoanApplicationQuery,
} from "../../redux/features/HubManager/hubManagerApplicationApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminApplicationModal from "../../ui/Modal/AdminApplication/ViewAdminApplicationModal";
import AdminApplicationTable from "../../ui/Tables/AdminApplicationTable";
import DaysSelection from "../../utils/DaysSelection";
import ApproveModal from "../../ui/Modal/ApproveModal";
import RejectModal from "../../ui/Modal/RejectModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const HubManagerAllApplications = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [filtering, setFiltering] = useState<string>("30");
  const { collapsed } = useAppSelector((state) => state.auth);

  const { pathname } = useLocation();
  const newPathname = pathname.split("/")[1];

  const { data, isFetching } = useGetAllHubManagerLoanApplicationQuery({
    page,
    limit,
    searchTerm: searchText,
    supervisorApproval: newPathname !== "supervisor" ? "approved" : undefined,
    filtering,
  });

  const application = data?.data;

  const [applicationAction] = useApplicationActionMutation();

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsApproveModalVisible(false);
    setIsRejectModalVisible(false);
    setCurrentRecord(null);
  };

  const showApprovedModal = (record: any) => {
    setCurrentRecord(record);
    setIsApproveModalVisible(true);
  };

  const showRejectedModal = (record: any) => {
    setCurrentRecord(record);
    setIsRejectModalVisible(true);
  };

  const handleAccept = async () => {
    const res = await tryCatchWrapper(
      applicationAction,
      { body: { action: "approved", loanId: currentRecord?._id } },
      "Accepting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  const handleDelete = async () => {
    const res = await tryCatchWrapper(
      applicationAction,
      { body: { action: "rejected", loanId: currentRecord?._id } },
      "Rejecting ..."
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
          <p className="text-xl font-semibold">All Applications</p>
          <DaysSelection
            currentUser={filtering}
            setCurrentUser={setFiltering}
          />
        </div>

        <AdminApplicationTable
          data={application?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
          showApprovedModal={showApprovedModal}
          showRejectedModal={showRejectedModal}
          editModalShow={false}
          approveShow={true}
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

        <ApproveModal
          isApproveModalVisible={isApproveModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleApprove={handleAccept}
        />

        <RejectModal
          isRejectModalVisible={isRejectModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleReject={handleDelete}
        />
      </div>
    </div>
  );
};

export default HubManagerAllApplications;
