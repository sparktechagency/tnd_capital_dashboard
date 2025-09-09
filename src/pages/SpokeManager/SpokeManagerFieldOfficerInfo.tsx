/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { useAllFieldOfficerInfoQuery } from "../../redux/features/spokeManager/spokeManagerOverviewApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewSpokeManagerFieldOfficer from "../../ui/Modal/SpokeManagerFieldOfficer/ViewSpokeManagerFieldOfficer";
import SpokeManagerFieldOfficerTable from "../../ui/Tables/SpokeManagerFieldOfficerTable";
import DaysSelection from "../../utils/DaysSelection";
import Loading from "../../ui/Loading";

const SpokeManagerFieldOfficerInfo = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { data, isFetching } = useAllFieldOfficerInfoQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };


  return (
    <section className="min-h-screen">
      <Topbar collapsed={collapsed}>
        <div className="flex items-center  gap-x-10 py-5">
          <ReuseSearchInput
            placeholder="Search"
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </Topbar>
      <div>
        <div className="mt-14">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xl font-semibold">All Field Officers</p>
            <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
          </div>

          <SpokeManagerFieldOfficerTable
            data={data?.data?.result}
            loading={isFetching}
            showViewModal={showViewUserModal}
            limit={limit}
            page={page}
            setPage={setPage}
            total={data?.data?.meta?.total}
          />

          <ViewSpokeManagerFieldOfficer
            isViewModalVisible={isViewModalVisible}
            handleCancel={handleCancel}
            currentRecord={currentRecord}
          />
        </div>
      </div>
    </section>
  );
};

export default SpokeManagerFieldOfficerInfo;
