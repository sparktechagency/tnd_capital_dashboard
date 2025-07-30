/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
import { AllIcons } from "../../../public/images/AllImages";
import ReuseTable from "../../utils/ReuseTable";

interface AdminAdminHRTableProps {
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
const AdminHRTable: React.FC<AdminAdminHRTableProps> = ({
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
      render: (_text: string, record: any) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src={record.image} // Replace with your actual image key
            alt={record.fullName}
            style={{
              width: 45,
              height: 45,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span>{record.fullName}</span>
        </div>
      ),
    },

    {
      title: "Phone Number",
      dataIndex: "phoneNumber", // Data key for phoneNumber
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email", // Data key for email
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "date", // Data key for role
      key: "date",
    },

    {
      title: "Address",
      dataIndex: "address", // Data key for role
      key: "address",
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

          <Tooltip placement="right" title="View Details">
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

export default AdminHRTable;
