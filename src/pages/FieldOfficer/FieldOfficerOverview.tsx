/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import Bar_Chart from "../../Components/Chart/BarChart";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import Topbar from "../../Components/Shared/Topbar";
import {
  useAllLeadsQuery,
  useDeleteFieldOfficerLeadsMutation,
} from "../../redux/features/fieldOfficer/fieldOfficerLeadsApi";
import {
  useFieldOfficerLeadsReportChartQuery,
  useGetFieldOfficerOverviewQuery,
} from "../../redux/features/fieldOfficer/fieldOfficerOverviewApi";
import { useAppSelector } from "../../redux/hooks";
import Loading from "../../ui/Loading";
import ViewLeadsModal from "../../ui/Modal/AdminModals/ViewLeadsModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import EditLeadsModal from "../../ui/Modal/FieldOfficerModals/EditLeadsModal";
import FieldOfficerLeadsTable from "../../ui/Tables/FieldOfficerLeadsTable";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import YearOption from "../../utils/YearOption";

const FieldOfficerOverview = () => {
  const [page, setPage] = useState(1);

  const limit = 8;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const { collapsed } = useAppSelector((state) => state.auth);
  const [year, setYear] = useState(new Date().getFullYear());

  // api calling
  const { data: dashboardCount, isLoading } = useGetFieldOfficerOverviewQuery(
    {}
  );

  const { data: chartData, isLoading: isLoadingChart } =
    useFieldOfficerLeadsReportChartQuery({
      year: year,
    });

  const { data, isLoading: isLoadingLeads } = useAllLeadsQuery({
    page,
    limit: limit,
  });
  const leads = data?.data;

  const [deleteFieldOfficerLeads] = useDeleteFieldOfficerLeadsMutation();

  //
  //

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const showEditModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsEditModalVisible(false);
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

  const cards = [
    {
      id: 1,
      background: "#FFFFFF",
      name: "Total Leads",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.clients} className="size-7" alt="icon" />
        </div>
      ),
      count: dashboardCount?.data?.totalLeads,
    },
    {
      id: 2,
      background: "#FFFFFF",
      name: "Total Application",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.application} className="size-7" alt="icon" />
        </div>
      ),
      count: dashboardCount?.data?.totalApplication,
    },
    {
      id: 3,
      background: "#FFFFFF",
      name: "Repayments",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.overdue} className="size-7" alt="icon" />
        </div>
      ),
      count: dashboardCount?.data?.totalRepaymentsAmount,
    },
    {
      id: 3,
      background: "#FFFFFF",
      name: "Total Clients",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.clients} className="size-7" alt="icon" />
        </div>
      ),
      count: dashboardCount?.data?.totalClients,
    },
  ];

  if (isLoading || isLoadingChart) {
    return <Loading />;
  }

  return (
    <section>
      <Topbar collapsed={collapsed}></Topbar>
      <div className="mt-10">
        <div className="mt-6">
          <AdminOverviewCard cards={cards} className="" />
        </div>

        <div className="shadow-lg w-full border border-[#ddd] rounded-xl p-4">
          <div className="flex items-center justify-between py-4">
            <p className="text-xl font-medium">Total Leads</p>
            <YearOption currentYear={year} setThisYear={setYear} key={""} />
          </div>
          <Bar_Chart data={chartData?.data} />
        </div>

        <p className="text-2xl font-medium mt-10">Recent Leads</p>
        <div className="shadow-lg w-full border border-[#ddd] rounded-xl mt-5">
          <FieldOfficerLeadsTable
            loading={isLoadingLeads}
            showViewModal={showViewUserModal}
            showEditModal={showEditModal}
            showDeleteModal={showDeleteModal}
            limit={limit}
            data={leads?.result}
            page={page}
            setPage={setPage}
          />

          <ViewLeadsModal
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />

          <DeleteModal
            handleDelete={handleDelete}
            isDeleteModalVisible={isDeleteModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />

          <EditLeadsModal
            isEditModalVisible={isEditModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        </div>
      </div>
    </section>
  );
};

export default FieldOfficerOverview;
