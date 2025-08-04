/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { FieldOfficer } from "../../Components/svg/leads";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ViewAdminFieldOfficerModal from "../../ui/Modal/AdminFieldOfficer/ViewAdminFieldOfficerModal";
import DeleteModal from "../../ui/Modal/DeleteModal";
import AdminFieldOfficerTable from "../../ui/Tables/AdminFieldOfficerTable";
import DaysSelection from "../../utils/DaysSelection";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { officerData } from "./fakeData";
import BlockModal from "../../ui/Modal/BlockModal";
import UnblockModal from "../../ui/Modal/UnblockModal";

const AdminFieldOfficers = () => {
  const [page, setPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  console.log(searchText);
  const limit = 12;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any | null>(null);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [isUnblockModalVisible, setIsUnblockModalVisible] = useState(false);
  const { collapsed } = useAppSelector((state) => state.auth);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record: any) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsBlockModalVisible(false);
    setIsUnblockModalVisible(false);
    setCurrentRecord(null);
  };

  const showBlockModal = (record: any) => {
    setCurrentRecord(record);
    setIsBlockModalVisible(true);
  };
  const showUnblockModal = (record: any) => {
    setCurrentRecord(record);
    setIsUnblockModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
    // setCurrentRecord(null);
  };

  const handleDelete = async () => {
    const res = await tryCatchWrapper(
      // deleteAdmin,
      { params: currentRecord?._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  const handleBlock = async (data: any) => {
    const res = await tryCatchWrapper(
      // userAction,
      {
        body: {
          userId: data?._id,
          action: "blocked",
        },
      },
      "Blocking..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };
  const handleUnblock = async (data: any) => {
    const res = await tryCatchWrapper(
      // userAction,
      {
        body: {
          userId: data?._id,
          action: "active",
        },
      },
      "Unblocking..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  return (
    <div>
      <Topbar collapsed={collapsed}>
        <div className="flex items-center  gap-x-10 py-5">
          <ReuseSearchInput
            placeholder="Search"
            setSearch={setSearchText}
            setPage={setPage}
          />
          <ReuseButton
            children="Officer Information "
            url="/admin/field-officers/officer-information"
            icon={FieldOfficer()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
          />
        </div>
      </Topbar>

      <div className="mt-14">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">All Field Officers</p>
          <DaysSelection currentUser="Days" setCurrentUser={() => {}} />
        </div>

        <AdminFieldOfficerTable
          data={officerData}
          loading={false}
          showViewModal={showViewUserModal}
          showDeleteModal={showDeleteModal}
          showBlockModal={showBlockModal}
          showUnblockModal={showUnblockModal}
          limit={limit}
          page={page}
          setPage={setPage}
        />

        <ViewAdminFieldOfficerModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />

        <DeleteModal
          currentRecord={currentRecord}
          isDeleteModalVisible={isDeleteModalVisible}
          handleCancel={handleDeleteCancel}
          handleDelete={handleDelete}
        />
        <BlockModal
          currentRecord={currentRecord}
          isBlockModalVisible={isBlockModalVisible}
          handleCancel={handleCancel}
          handleBlock={handleBlock}
        />

        <UnblockModal
          currentRecord={currentRecord}
          isUnblockModalVisible={isUnblockModalVisible}
          handleCancel={handleCancel}
          handleUnblock={handleUnblock}
        />
      </div>
    </div>
  );
};

export default AdminFieldOfficers;
