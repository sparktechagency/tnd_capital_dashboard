/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import Bar_Chart from "../../Components/Chart/BarChart";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import Topbar from "../../Components/Shared/Topbar";
import { useGetAllHubManagerLoanApplicationQuery } from "../../redux/features/HubManager/hubManagerApplicationApi";
import { useSupervisorOverviewQuery } from "../../redux/features/supervisor/supervisorApi";
import { useAppSelector } from "../../redux/hooks";
import ViewAdminApplicationModal from "../../ui/Modal/AdminApplication/ViewAdminApplicationModal";
import AdminApplicationTable from "../../ui/Tables/AdminApplicationTable";
import YearOption from "../../utils/YearOption";
import Loading from "../../ui/Loading";

const SupervisorOverview = () => {
  const [page, setPage] = useState<number>(1);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const { collapsed } = useAppSelector((state) => state.auth);
  const [year, setYear] = useState<number>(2025);
  // api calling
  const { data: supervisorOverview, isLoading } = useSupervisorOverviewQuery({
    year: year,
  });

  const { data, isFetching } = useGetAllHubManagerLoanApplicationQuery({
    page,
    limit,
  });

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  const cards = [
    {
      id: 1,
      background: "#FFFFFF",
      name: "Total Applications",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.application} className="size-7" alt="icon" />
        </div>
      ),
      count: supervisorOverview?.data?.allApplicationCount,
    },
    {
      id: 1,
      background: "#FFFFFF",
      name: "Pending Applications",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.application} className="size-7" alt="icon" />
        </div>
      ),
      count: supervisorOverview?.data?.totalApplicationPending,
    },
    {
      id: 1,
      background: "#FFFFFF",
      name: "Approved Applications  ",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.application} className="size-7" alt="icon" />
        </div>
      ),
      count: supervisorOverview?.data?.totalApplicationApprove,
    },

    {
      id: 3,
      background: "#FFFFFF",
      name: "Rejected Applications",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.application} className="size-7" alt="icon" />
        </div>
      ),
      count: supervisorOverview?.data?.totalApplicationRejected,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <Topbar collapsed={collapsed}></Topbar>
      <div className="mt-6">
        <div className="mt-6">
          <AdminOverviewCard cards={cards} subClassName="justify-center" />
        </div>
        <div className="shadow-lg w-full border border-[#ddd] rounded-xl p-4">
          <div className="flex items-center justify-between py-4">
            <p className="text-xl font-medium">Total Application</p>
            <YearOption currentYear={year} setThisYear={setYear} key={""} />
          </div>
          <Bar_Chart data={supervisorOverview?.data?.totalApplicationChart} />
        </div>
        <p className="text-lg font-medium pt-6 ">Recent Applications</p>
        <div className="shadow-lg w-full border border-[#ddd] rounded-xl mt-5">
          <AdminApplicationTable
            loading={isFetching}
            showViewModal={showViewUserModal}
            limit={limit}
            data={data?.data?.result}
            page={page}
            setPage={setPage}
            total={0}
          />

          <ViewAdminApplicationModal
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        </div>
      </div>
    </section>
  );
};

export default SupervisorOverview;
