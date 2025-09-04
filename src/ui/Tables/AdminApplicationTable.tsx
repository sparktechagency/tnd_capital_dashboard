/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
// import { MdBlock } from "react-icons/md";
import { AllIcons } from "../../../public/images/AllImages";
import ReuseTable from "../../utils/ReuseTable";
import { getImageUrl } from "../../helpers/config/envConfig";

interface AdminApplicationTableProps {
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
const AdminApplicationTable: React.FC<AdminApplicationTableProps> = ({
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
        console.log(record, "record");

        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={getImageUrl() + record?.clientId?.customFields?.image}
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

          <Tooltip placement="right" title="Delete Application">
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

export default AdminApplicationTable;
