/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import Bar_Chart from "../../Components/Chart/BarChart";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import Topbar from "../../Components/Shared/Topbar";
import { useGetAllManagersQuery } from "../../redux/features/admin/adminUsers/adminUsers";
import { useHrDashboardOverviewQuery } from "../../redux/features/HR/hrDashboardOverviewApi";
import { useAppSelector } from "../../redux/hooks";
import Loading from "../../ui/Loading";
import HROverviewUserTable from "../../ui/Tables/HROverviewUserTable";
import YearOption from "../../utils/YearOption";

const HROverview = () => {
  const [page, setPage] = useState(1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const limit = 12;

  const { collapsed } = useAppSelector((state) => state.auth);

  // api calling
  const { data, isLoading } = useHrDashboardOverviewQuery({
    year: currentYear,
  });

  const { data: mangersData, isLoading: mangerLoading } =
    useGetAllManagersQuery({
      page: 1,
      limit: 10,
    });

  const cards = [
    {
      id: 1,
      background: "#FFFFFF",
      name: "Total Field Officers ",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.clients} className="size-7" alt="icon" />
        </div>
      ),
      count: data?.data?.totalFieldOfficer,
    },

    {
      id: 3,
      background: "#FFFFFF",
      name: "Total Managers",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.manager} className="size-7" alt="icon" />
        </div>
      ),
      count: data?.data?.totalManagers,
    },
  ];

  if (isLoading || mangerLoading) return <Loading />;

  return (
    <section>
      <Topbar collapsed={collapsed}></Topbar>
      <div className="mt-6">
        <div className="mt-6">
          <AdminOverviewCard cards={cards} subClassName="justify-center" />
        </div>
        <div className="shadow-lg w-full border border-[#ddd] rounded-xl p-4">
          <div className="flex items-center justify-between py-4">
            <p className="text-xl font-medium">Total Field Officers</p>
            <YearOption
              currentYear={currentYear}
              setThisYear={setCurrentYear}
              key={""}
            />
          </div>
          <Bar_Chart data={data?.data?.formattedResult} />
        </div>

        <p className="mt-6 font-medium text-xl">Managers</p>

        <div className="shadow-lg w-full border border-[#ddd] rounded-xl mt-5">
          <HROverviewUserTable
            loading={false}
            limit={limit}
            data={mangersData?.data?.result}
            page={page}
            setPage={setPage}
            total={0}
          />
        </div>
      </div>
    </section>
  );
};

export default HROverview;
