/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import { getImageUrl } from "../../helpers/config/envConfig";

interface AdminClientsTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  showDeleteModal: (record: any) => void;
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
  isShowOtherAction?: boolean;
}

const AdminClientsTable: React.FC<AdminClientsTableProps> = ({
  data,
  loading,
  showViewModal,
  showDeleteModal,
  setPage,
  page,
  total,
  limit,
}) => {
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
                record?.client?.customFields?.image
                  ? getImageUrl() + record?.client?.customFields?.image
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
            <span>{record?.client?.customFields?.name}</span>
          </div>
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: ["client", "phoneNumber"], // Data key for phoneNumber
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Loan Amount",
      dataIndex: "loanAmountRequested", // Data key for email
      key: "loanAmountRequested",
      align: "center",
    },

    {
      title: "Initial Amount",
      dataIndex: "loanAmountRequested", // Data key for role
      key: "loanAmountRequested",
      align: "center",
    },
    {
      title: "Term",
      dataIndex: "term", // Data key for role
      key: "term",
      align: "center",
    },

    {
      title: "Status",
      dataIndex: "loanStatus", // Data key for role
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
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <img src={AllIcons.eye} />
            </button>
          </Tooltip>

          <Tooltip placement="right" title="Delete Clients">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showDeleteModal(record)}
            >
              <img src={AllIcons.deleteIcon} />
            </button>
          </Tooltip>
        </Space>
      ),
      align: "center",
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

export default AdminClientsTable;
