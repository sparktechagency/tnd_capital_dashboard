/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
// import { MdBlock } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { useLocation } from "react-router-dom";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import { getImageUrl } from "../../helpers/config/envConfig";
import ReuseTable from "../../utils/ReuseTable";

interface AdminApplicationTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  showDeleteModal?: (record: any) => void;
  showRejectedModal?: (record: any) => void;
  showApprovedModal?: (record: any) => void;
  deleteModalShow?: boolean;
  showEditUserModal?: (record: any) => void;
  editModalShow?: boolean;
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
  isShowOtherAction?: boolean;
  approveShow?: boolean;
}
const AdminApplicationTable: React.FC<AdminApplicationTableProps> = ({
  data,
  loading,
  showViewModal,
  showEditUserModal,
  editModalShow = false,
  approveShow = false,
  showApprovedModal,
  showRejectedModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const { pathname } = useLocation();
  const newPathname = pathname.split("/")[1];

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_text: any, record: any) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={
                record?.clientId?.customFields?.image
                  ? getImageUrl() + record?.clientId?.customFields?.image
                  : AllImages.profile
              }
              alt={record.fullName}
              style={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span>{record?.clientId?.customFields?.name}</span>
          </div>
        );
      },
    },

    {
      title: "Phone Number",
      dataIndex: ["clientId", "phoneNumber"], // Data key for phoneNumber
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: ["clientId", "email"], // Data key for email
      key: "email",
      align: "center",
    },

    {
      title: "Address",
      dataIndex: ["clientId", "customFields", "homeAddress"],
      key: "address",
      align: "center",
    },

    {
      title: "Status",
      dataIndex:
        newPathname === "supervisor"
          ? "supervisorApproval"
          : newPathname === "hubManager"
          ? "hubManagerApproval"
          : "loanStatus", // Data key for role
      render: (text: string) => (
        <div
          className={`${
            text === "pending"
              ? "text-[#EAB90A]"
              : text === "approved"
              ? "text-[#21B14C]"
              : "text-[#DD2626]"
          } capitalize`}
        >
          {text}
        </div>
      ),
      key: "status",
      align: "center",
    },

    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer  lg:w-full w-[30px]"
              onClick={() => showViewModal(record)}
            >
              <img src={AllIcons.eye} />
            </button>
          </Tooltip>

          {editModalShow && (
            <Tooltip placement="right" title="Edit">
              <button
                className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer  lg:w-full w-[30px]"
                onClick={() => showEditUserModal?.(record)}
              >
                <img src={AllIcons.pen} />
              </button>
            </Tooltip>
          )}

          {approveShow && (
            <>
              {newPathname === "supervisor" || newPathname === "hubManager" ? (
                <>
                  {record.supervisorApproval === "pending" ||
                  record.hubManagerApproval === "pending" ? (
                    <>
                      {/* Approve Button */}
                      <Tooltip placement="right" title="Approve Application">
                        <button
                          className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer  lg:w-full w-[30px]"
                          onClick={() => showApprovedModal?.(record)}
                        >
                          <FcApproval className="text-2xl" />
                        </button>
                      </Tooltip>

                      {/* Reject Button */}
                      <Tooltip placement="right" title="Reject Application">
                        <button
                          className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer  lg:w-full w-[30px]"
                          onClick={() => showRejectedModal?.(record)}
                        >
                          <img className="size-5" src={AllIcons.reject} />
                        </button>
                      </Tooltip>
                    </>
                  ) : record.supervisorApproval === "rejected" ||
                    record.hubManagerApproval === "rejected" ? (
                    <>
                      {/* Only Reject Button */}
                      <Tooltip placement="right" title="Approve Application">
                        <button
                          className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer  lg:w-full w-[30px]"
                          onClick={() => showApprovedModal?.(record)}
                        >
                          <FcApproval className="text-2xl" />
                        </button>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      {/* Default: Only Reject Button */}
                      <Tooltip placement="right" title="Reject Application">
                        <button
                          className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer  lg:w-full w-[30px]"
                          onClick={() => showRejectedModal?.(record)}
                        >
                          <img className="size-5" src={AllIcons.reject} />
                        </button>
                      </Tooltip>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* If not supervisor, default Reject */}
                  <Tooltip placement="right" title="Reject Application">
                    <button
                      className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer  lg:w-full w-[30px]"
                      onClick={() => showRejectedModal?.(record)}
                    >
                      <img className="size-5" src={AllIcons.reject} />
                    </button>
                  </Tooltip>
                </>
              )}
            </>
          )}
        </Space>
      ),
      align: "end",
    },
  ];

  return (
    <div>
      <ReuseTable
        columns={columns}
        data={data}
        loading={loading}
        setPage={setPage}
        total={total}
        limit={limit}
        page={page}
        scroll={{ x: true }}
        keyValue={"email"}
      />
    </div>
  );
};

export default AdminApplicationTable;
