/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import Topbar from "../../Components/Shared/Topbar";
import { PlusIcon } from "../../Components/svg/leads";
import {
  useDeleteRepaymentsMutation,
  useGetAllRepaymentsQuery,
  useRepaymentCountQuery,
} from "../../redux/features/admin/adminRepayments/adminRepaymentsApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminRepaymentsModal from "../../ui/Modal/AdminRepayments/ViewAdminRepaymentsModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AdminRepaymentsTable from "../../ui/Tables/AdminRepaymentsTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Loading from "../../ui/Loading";

const AdminRepayments = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const limit = 12;
  const [filtering, setFiltering] = useState<string>("30");

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { collapsed } = useAppSelector((state) => state.auth);

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

  // api calling

  const { data: repayments, isFetching } = useGetAllRepaymentsQuery({
    page,
    limit,
    searchTerm: searchText,
    filtering,
  });

  const repaymentsData = repayments?.data;

  // delete
  const [deleteRepayments] = useDeleteRepaymentsMutation();
  // count
  const { data: repaymentsCount, isLoading: countLoading } =
    useRepaymentCountQuery({});

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
      name: "Total Collection",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.collection} className="size-7" alt="icon" />
        </div>
      ),
      count: repaymentsCount?.data?.todayCollection,
    },
    {
      id: 2,
      background: "#FFFFFF",
      name: "Penalty",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.application} className="size-7" alt="icon" />
        </div>
      ),
      count: repaymentsCount?.data?.overdue,
    },
  ];

  if (countLoading) {
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
          <ReuseButton
            children="Payment Information"
            url="/admin/repayments/add-repayments"
            icon={PlusIcon()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
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

export default AdminRepayments;
