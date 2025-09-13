/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import Topbar from "../../Components/Shared/Topbar";
import { useGetAllHubManagerRepaymentsQuery } from "../../redux/features/HubManager/hubManagerRepaymentsApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminRepaymentsModal from "../../ui/Modal/AdminRepayments/ViewAdminRepaymentsModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AdminRepaymentsTable from "../../ui/Tables/AdminRepaymentsTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import {
  useDeleteRepaymentsMutation,
  useRepaymentCountQuery,
} from "../../redux/features/admin/adminRepayments/adminRepaymentsApi";
import Loading from "../../ui/Loading";

const HubManagerRepayments = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const limit = 12;
  const [filtering, setFiltering] = useState<string>("30");
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { collapsed } = useAppSelector((state) => state.auth);

  // api calling

  const { data, isFetching } = useGetAllHubManagerRepaymentsQuery({
    page,
    limit,
    searchTerm: searchText,
    filtering,
  });

  const repaymentsData = data?.data;

  const { data: repaymentCount, isLoading: repaymentCountLoading } =
    useRepaymentCountQuery({});
  const [deleteRepayments] = useDeleteRepaymentsMutation();

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
      deleteRepayments,
      { params: currentRecord?._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  const cards = [
    {
      id: 1,
      background: "#FFFFFF",
      name: "Todays Collection",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.collection} className="size-7" alt="icon" />
        </div>
      ),
      count: repaymentCount?.data?.todayCollection,
    },
    {
      id: 2,
      background: "#FFFFFF",
      name: "Total Overdue",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.application} className="size-7" alt="icon" />
        </div>
      ),
      count: repaymentCount?.data?.overdue,
    },
  ];

  if (repaymentCountLoading) {
    return <Loading />;
  }

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
        <div className="lg:w-[950px] mx-auto">
          <AdminOverviewCard cards={cards} />
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">Repayment Table</p>
          <DaysSelection
            currentUser={filtering}
            setCurrentUser={setFiltering}
          />
        </div>

        <AdminRepaymentsTable
          data={repaymentsData?.result}
          loading={isFetching}
          showViewModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
          limit={limit}
          page={page}
          setPage={setPage}
          total={repaymentsData?.meta?.total}
        />

        <ViewAdminRepaymentsModal
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

export default HubManagerRepayments;
