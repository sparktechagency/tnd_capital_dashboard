/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Area_Chart from "../../Components/Chart/AreaChart";
import MultiRingChart from "../../Components/Chart/MultiRingChart";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ViewFieldOfficerCollectionModal from "../../ui/Modal/AdminModals/FieldOfficerCollectionModal/ViewFieldOfficerCollectionModal";
import FieldOfficerTable from "../../ui/Tables/FieldOfficerCollectionTable";
import YearOption from "../../utils/YearOption";
import { fieldOfficerData } from "../Admin/fakeData";
import DaysSelection from "../../utils/DaysSelection";

const chartData = [
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

const data = [
  { label: "Rejected", color: "bg-purple-700", percent: 75 },
  { label: "Pending", color: "bg-green-500", percent: 25 },
];

const FieldOfficerReportsAndAnalytics = () => {
  const [page, setPage] = useState(1);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const { collapsed } = useAppSelector((state) => state.auth);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <section>
      <Topbar collapsed={collapsed}></Topbar>
      <div className="mt-10">
        <div className="flex items-center justify-between gap-x-8">
          <div className="shadow-lg w-full border border-[#ddd] rounded-xl p-4">
            <div className="flex items-center justify-between py-4">
              <p className="text-xl font-medium">Collection Report</p>
              <YearOption currentYear={2025} setThisYear={() => {}} key={""} />
            </div>
            <Area_Chart chartData={chartData} />
          </div>
          <div className="shadow-lg w-[700px] border border-[#ddd] rounded-xl p-4">
            <div className="flex items-center justify-between py-4">
              <p className="text-xl font-medium">Loan Approval</p>
              <YearOption currentYear={2025} setThisYear={() => {}} key={""} />
            </div>
            <div className="flex items-center justify-between pr-4">
              <MultiRingChart />
              <div>
                <div className="space-y-6">
                  {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-start">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-3 h-3 rounded-full ${item.color}`}
                        ></span>
                        <span className="text-gray-500 text-sm">
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
          <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
        </div>

        <div className="shadow-lg w-full border border-[#ddd] rounded-xl mt-5">
          <FieldOfficerTable
            isShowOtherAction={false}
            loading={false}
            showViewModal={showViewUserModal}
            limit={limit}
            data={fieldOfficerData}
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

export default FieldOfficerReportsAndAnalytics;
