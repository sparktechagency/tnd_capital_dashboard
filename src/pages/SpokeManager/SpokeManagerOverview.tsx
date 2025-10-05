/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ViewFieldOfficerCollectionModal from "../../ui/Modal/AdminModals/FieldOfficerCollectionModal/ViewFieldOfficerCollectionModal";
import FieldOfficerTable from "../../ui/Tables/FieldOfficerCollectionTable";

import Bar_Chart from "../../Components/Chart/BarChart";
import {
  useGetSpokeMangerCountsQuery,
  useSpokeManageCollectionReportQuery,
  useSpokeManagerFieldOfficerCollectionQuery,
} from "../../redux/features/spokeManager/spokeManagerOverviewApi";
import Loading from "../../ui/Loading";
import YearOption from "../../utils/YearOption";

const SpokeManagerOverview = () => {
  const [page, setPage] = useState(1);

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const { collapsed } = useAppSelector((state) => state.auth);
  const [year, setYear] = useState(2025);

  // api calling
  const { data: spokeManagerCount, isLoading } = useGetSpokeMangerCountsQuery(
    {}
  );

  const { data: collectionReport, isLoading: isLoadingReport } =
    useSpokeManageCollectionReportQuery({
      year: year,
    });

  const { data: fieldOfficerCollection, isFetching: fieldOfficerLoading } =
    useSpokeManagerFieldOfficerCollectionQuery({
      page: page,
      limit: limit,
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
      name: "Todays Collection",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.collection} className="size-7" alt="icon" />
        </div>
      ),
      count: spokeManagerCount?.data?.todayCollection,
    },

    {
      id: 2,
      background: "#FFFFFF",
      name: "Overdue",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.overdue} className="size-7" alt="icon" />
        </div>
      ),
      count: spokeManagerCount?.data?.overdue,
    },
    {
      id: 3,
      background: "#FFFFFF",
      name: "Total Leads",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.clients} className="size-7" alt="icon" />
        </div>
      ),
      count: spokeManagerCount?.data?.allLeads,
    },
    {
      id: 4,
      background: "#FFFFFF",
      name: "Total Clients",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.clients} className="size-7" alt="icon" />
        </div>
      ),
      count: spokeManagerCount?.data?.allCleints,
    },
  ];

  if (isLoading || isLoadingReport || fieldOfficerLoading) {
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
            <p className="text-xl font-medium">Collection Report</p>
            <YearOption currentYear={year} setThisYear={setYear} key={""} />
          </div>
          <Bar_Chart data={collectionReport?.data} />
        </div>
        <p className="text-lg font-medium pt-6 ">
          All Field Officer Collection
        </p>
        <div className="shadow-lg w-full border border-[#ddd] rounded-xl mt-5">
          <FieldOfficerTable
            isShowOtherAction={false}
            loading={fieldOfficerLoading}
            showViewModal={showViewUserModal}
            limit={limit}
            data={fieldOfficerCollection?.data?.result}
            page={page}
            setPage={setPage}
            total={fieldOfficerCollection?.data?.meta?.total}
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

export default SpokeManagerOverview;
