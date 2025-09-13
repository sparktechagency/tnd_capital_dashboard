/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { Location } from "../../Components/svg/leads";
import { useGetLocationProfileQuery } from "../../redux/features/admin/adminLocationProfile/adminLocationProfileApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import Loading from "../../ui/Loading";
import EditLocationProfileModal from "../../ui/Modal/AdminLocationProfile/EditLocationProfileModal";
import ViewAdminLocationProfileModal from "../../ui/Modal/AdminLocationProfile/ViewAdminLocationProfileModal";
import AdminLocationProfileTable from "../../ui/Tables/AdminLocationProfileTable";

const AdminLocationProfile = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const [searchText, setSearchText] = useState<string>("");

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);

  const { collapsed } = useAppSelector((state) => state.auth);

  // api calling
  const { data, isLoading } = useGetLocationProfileQuery({
    page,
    limit,
    searchTerm: searchText,
  });

  const locationProfile = data?.data;

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showEditUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsEditModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsEditModalVisible(false);
    setCurrentRecord(null);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}>
        <div className="flex items-center  gap-x-10 py-5">
          <ReuseSearchInput
            placeholder="Search"
            setSearch={setSearchText}
            setPage={setPage}
          />

          <ReuseButton
            children="Location"
            url="/admin/location/add-location"
            icon={Location()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
          />
        </div>
      </Topbar>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">Location Profile</p>
        </div>
        <AdminLocationProfileTable
          loading={false}
          limit={limit}
          data={locationProfile?.result}
          showViewModal={showViewUserModal}
          showEditUserModal={showEditUserModal}
          page={page}
          setPage={setPage}
          total={locationProfile?.meta?.total}
        />

        <ViewAdminLocationProfileModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />

        <EditLocationProfileModal
          isEditModalVisible={isEditModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
};

export default AdminLocationProfile;
