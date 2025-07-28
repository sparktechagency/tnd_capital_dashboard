/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import Bar_Chart from "../../Components/Chart/BarChart";
import HROverviewUserTable from "../../ui/Tables/HROverviewUserTable";
import YearOption from "../../utils/YearOption";
import { fieldOfficerData } from "../Admin/fakeData";

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
    count: "806",
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
    count: "806",
  },
];

const HROverview = () => {
  const [page, setPage] = useState(1);

  const limit = 12;

  const { collapsed } = useAppSelector((state) => state.auth);

  return (
    <section>
      <Topbar collapsed={collapsed}></Topbar>
      <div className="mt-6">
        <div className="flex items-center">
          <img
            src={AllImages.profile}
            alt="profile_pic"
            style={{ width: "60px", height: "60px", marginRight: "10px" }}
            className="rounded-full border border-secondary-color"
          />
          <div className="flex flex-col justify-center">
            <p className="font-semibold text-xl">Hello, Emma Taylor</p>
            <p className="text-lg font-normal">
              Check your activities in this dashboard.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <AdminOverviewCard cards={cards} subClassName="justify-center" />
        </div>
        <div className="shadow-lg w-full border border-[#ddd] rounded-xl p-4">
          <div className="flex items-center justify-between py-4">
            <p className="text-xl font-medium">Total Field Officers</p>
            <YearOption currentYear={2025} setThisYear={() => {}} key={""} />
          </div>
          <Bar_Chart />
        </div>

        <div className="shadow-lg w-full border border-[#ddd] rounded-xl mt-5">
          <HROverviewUserTable
            loading={false}
            limit={limit}
            data={fieldOfficerData}
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
