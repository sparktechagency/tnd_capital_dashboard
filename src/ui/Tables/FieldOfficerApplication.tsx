/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
import { MdBlock } from "react-icons/md";
import { AllIcons } from "../../../public/images/AllImages";
import ReuseTable from "../../utils/ReuseTable";
import { Link } from "react-router-dom";

interface FieldOfficerApplicationProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;

  showViewModal: (record: any) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
  isShowOtherAction?: boolean;
}
const FieldOfficerApplication: React.FC<FieldOfficerApplicationProps> = ({
  data,
  loading,
  showViewModal,
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
      render: (text: any, record: any) => (
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
      title: "Address",
      dataIndex: "address", // Data key for role
      key: "address",
    },

    {
      title: "Status",
      dataIndex: "status", // Data key for role
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
          <Link to={`edit-loan-apply/${record.key}`}>
            <Tooltip placement="right" title="View Details">
              <button className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer">
                <img src={AllIcons.pen} />
              </button>
            </Tooltip>
          </Link>
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

export default FieldOfficerApplication;
