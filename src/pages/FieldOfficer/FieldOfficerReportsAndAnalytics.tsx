/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Area_Chart from "../../Components/Chart/AreaChart";
import MultiRingChart from "../../Components/Chart/MultiRingChart";
import Topbar from "../../Components/Shared/Topbar";
import {
  useGetFieldOfficerAllFieldOfficerCollectionQuery,
  useGetFieldOfficerCollectionReportQuery,
  useGetFieldOfficerLoanApprovalReportQuery,
} from "../../redux/features/fieldOfficer/fieldOfficerTrackingApi";
import { useAppSelector } from "../../redux/hooks";
import ViewFieldOfficerCollectionModal from "../../ui/Modal/AdminModals/FieldOfficerCollectionModal/ViewFieldOfficerCollectionModal";
import FieldOfficerTable from "../../ui/Tables/FieldOfficerCollectionTable";
import DaysSelection from "../../utils/DaysSelection";
import YearOption from "../../utils/YearOption";
import Loading from "../../ui/Loading";

const FieldOfficerReportsAndAnalytics = () => {
  const [page, setPage] = useState(1);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const { collapsed } = useAppSelector((state) => state.auth);
  const [year, setYear] = useState(2025);
  const [loanYear, setLoanYear] = useState(2025);
  // api calling
  const [filtering, setFiltering] = useState<string>("30");
  const { data: fieldOfficerCollectionReport, isLoading } =
    useGetFieldOfficerCollectionReportQuery({
      year: year,
    });

  const { data: fieldOfficerLoanApprovalReport, isLoading: reportLoading } =
    useGetFieldOfficerLoanApprovalReportQuery({
      year: year,
    });

  const { data: fieldOfficerAllFieldOfficerCollection, isFetching } =
    useGetFieldOfficerAllFieldOfficerCollectionQuery({
      page: page,
      limit: limit,
      filtering,
    });

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
      label: fieldOfficerLoanApprovalReport?.data[1]?.status,
      color: "bg-purple-700",
      percent: fieldOfficerLoanApprovalReport?.data[1]?.percentage,
    },
    {
      label: fieldOfficerLoanApprovalReport?.data[0]?.status,
      color: "bg-green-500",
      percent: fieldOfficerLoanApprovalReport?.data[0]?.percentage,
    },
  ];

  if (isLoading || reportLoading) return <Loading />;

  return (
    <section>
      <Topbar collapsed={collapsed}></Topbar>
      <div className="mt-10">
        <div className="flex items-center justify-between gap-x-8">
          <div className="shadow-lg w-full border border-[#ddd] rounded-xl p-4">
            <div className="flex items-center justify-between py-4">
              <p className="text-xl font-medium">Collection Report</p>
              <YearOption currentYear={year} setThisYear={setYear} key={""} />
            </div>
            <Area_Chart chartData={fieldOfficerCollectionReport?.data} />
          </div>
          <div className="shadow-lg w-[700px] border border-[#ddd] rounded-xl p-4">
            <div className="flex items-center justify-between py-4">
              <p className="text-xl font-medium">Loan Approval</p>
              <YearOption
                currentYear={loanYear}
                setThisYear={setLoanYear}
                key={""}
              />
            </div>
            <div className="flex items-center justify-between pr-4">
              <MultiRingChart
                loanApprovalReport={fieldOfficerLoanApprovalReport?.data}
              />
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
        <div className="flex items-center justify-between mb-4 mt-10">
          <p className="text-xl font-semibold">All Applications</p>
          <DaysSelection
            currentUser={filtering}
            setCurrentUser={setFiltering}
          />
        </div>

        <div className="shadow-lg w-full border border-[#ddd] rounded-xl mt-5">
          <FieldOfficerTable
            isShowOtherAction={false}
            loading={isFetching}
            showViewModal={showViewUserModal}
            limit={limit}
            data={fieldOfficerAllFieldOfficerCollection?.data?.result}
            page={page}
            setPage={setPage}
            total={fieldOfficerAllFieldOfficerCollection?.data?.meta?.total}
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

export default FieldOfficerReportsAndAnalytics;
