/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { GoEye } from "react-icons/go";
import { MdBlock, MdModeEditOutline } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
interface AdminFieldOfficerTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showEditModal: (record: any) => void;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  showBlockModal: (record: any) => void; // Function to handle blocking a user
  showUnblockModal: (record: any) => void; // Function to handle unblocking a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
  isShowOtherAction?: boolean;
}
const FieldOfficerTable: React.FC<AdminFieldOfficerTableProps> = ({
  data,
  loading,
  showEditModal,
  showViewModal,
  showBlockModal,
  showUnblockModal,
  setPage,
  page,
  total,
  limit,
  isShowOtherAction,
}) => {
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
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
      title: "Collected Amount",
      dataIndex: "collected_amount", // Data key for collected_amount
      render: (collected_amount: string) => <span>$ {collected_amount}</span>,
      key: "collected_amount",
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
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          {isShowOtherAction && (
            <>
              {/* View Details Tooltip */}
              <Tooltip placement="right" title="View Details">
                <button
                  className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
                  onClick={() => showEditModal(record)}
                >
                  <MdModeEditOutline style={{ fontSize: "24px" }} />
                </button>
              </Tooltip>

              {/* Block User Tooltip */}

              <Tooltip placement="left" title="Unblock">
                <button
                  className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer hidden"
                  onClick={() => showUnblockModal(record)}
                >
                  <CgUnblock style={{ fontSize: "24px" }} />
                </button>
              </Tooltip>

              <Tooltip placement="left" title="Block">
                <button
                  className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
                  onClick={() => showBlockModal(record)}
                >
                  <MdBlock style={{ fontSize: "24px" }} />
                </button>
              </Tooltip>
            </>
          )}
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
        keyValue={"email"}
      />
    </div>
  );
};

export default FieldOfficerTable;
