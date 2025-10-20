/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import Area_Chart from "../../Components/Chart/AreaChart";
import MultiRingChart from "../../Components/Chart/MultiRingChart";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import Topbar from "../../Components/Shared/Topbar";

import { useAppSelector } from "../../redux/hooks";
import Loading from "../../ui/Loading";
import ViewFieldOfficerCollectionModal from "../../ui/Modal/AdminModals/FieldOfficerCollectionModal/ViewFieldOfficerCollectionModal";
import FieldOfficerTable from "../../ui/Tables/FieldOfficerCollectionTable";
import YearOption from "../../utils/YearOption";
import {
  useGetAdminCountsQuery,
  useGetAdminLoanApprovalReportQuery,
  useGetCollectionChartQuery,
  useGetRecentOfficerCollectionQuery,
} from "../../redux/features/admin/adminOverview/adminOverviewApi";

export const chartData = [
  { month: "Jan", totalPresent: 35 },
  { month: "Feb", totalPresent: 50 },
  { month: "Mar", totalPresent: 20 },
  { month: "Apr", totalPresent: 50 },
  { month: "May", totalPresent: 90 },
  { month: "Jun", totalPresent: 40 },
  { month: "Jul", totalPresent: 80 },
  { month: "Aug", totalPresent: 19 },
  { month: "Sep", totalPresent: 80 },
  { month: "Oct", totalPresent: 90 },
  { month: "Nov", totalPresent: 105 },
  { month: "Dec", totalPresent: 106 },
];

const AdminOverview = () => {
  const [page, setPage] = useState(1);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const { collapsed } = useAppSelector((state) => state.auth);
  const [currentYear, setCurrentYear] = useState(2025);
  const [approvalYear, setApprovalYear] = useState(2025);

  const { data: adminCount, isLoading: countLoading } = useGetAdminCountsQuery(
    {}
  );
  const { data: collectionChart, isLoading: chartLoading } =
    useGetCollectionChartQuery({
      year: currentYear,
    });

  const { data: loanApprovalReport, isLoading: reportLoading } =
    useGetAdminLoanApprovalReportQuery({
      year: approvalYear,
    });

  const { data: recentApplication, isFetching } =
    useGetRecentOfficerCollectionQuery({});

  const applicationData = recentApplication?.data?.result;

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
      count: adminCount?.data?.totalCollection,
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
      count: adminCount?.data?.totalApplication,
    },
    {
      id: 3,
      background: "#FFFFFF",
      name: "Overdue",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.overdue} className="size-7" alt="icon" />
        </div>
      ),
      count: adminCount?.data?.totalOverdue,
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
      count: adminCount?.data?.totalClients,
    },
  ];

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  const data = [
    {
      label: loanApprovalReport?.data[1]?.status,
      color: "bg-purple-700",
      percent: loanApprovalReport?.data[1]?.percentage,
    },
    {
      label: loanApprovalReport?.data[0]?.status,
      color: "bg-green-500",
      percent: loanApprovalReport?.data[0]?.percentage,
    },
  ];

  if (countLoading || chartLoading || reportLoading) return <Loading />;

  return (
    <section>
      <Topbar collapsed={collapsed}></Topbar>
      <div className="mt-6">
        <div className="mt-6">
          <AdminOverviewCard cards={cards} className="" />
        </div>
        <div className="flex items-center justify-between lg:flex-row flex-col gap-x-8">
          <div className="shadow-lg w-full border border-[#ddd] rounded-xl p-4">
            <div className="flex items-center justify-between py-4">
              <p className="text-xl font-medium">Collection Report</p>
              <YearOption
                currentYear={currentYear}
                setThisYear={setCurrentYear}
                key={""}
              />
            </div>
            <Area_Chart chartData={collectionChart?.data} />
          </div>
          <div className="shadow-lg lg:w-[700px] w-full border border-[#ddd] rounded-xl p-4 lg:mt-0 mt-4">
            <div className="flex items-center justify-between py-4">
              <p className="text-xl font-medium">Loan Approval</p>
              <YearOption
                currentYear={approvalYear}
                setThisYear={setApprovalYear}
                key={""}
              />
            </div>
            <div className="flex items-center justify-between pr-4">
              <MultiRingChart loanApprovalReport={loanApprovalReport?.data} />
              <div>
                <div className="space-y-6">
                  {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-start">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-3 h-3 rounded-full ${item.color}`}
                        ></span>
                        <span className="text-gray-500 text-sm capitalize">
                          {item.label}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-purple-900">
                        {item.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 font-medium text-xl">Recent Officer Collection</p>

        <div className="shadow-lg w-full border border-[#ddd] rounded-xl mt-5">
          <FieldOfficerTable
            isShowOtherAction={false}
            loading={isFetching}
            showViewModal={showViewUserModal}
            limit={limit}
            data={applicationData}
            page={page}
            setPage={setPage}
            total={0}
          />

          <ViewFieldOfficerCollectionModal
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        </div>
      </div>
    </section>
  );
};

export default AdminOverview;
