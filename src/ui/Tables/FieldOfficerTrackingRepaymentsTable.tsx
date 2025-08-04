/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
import { AllIcons } from "../../../public/images/AllImages";
import ReuseTable from "../../utils/ReuseTable";
import ReuseButton from "../Button/ReuseButton";

interface AdminRepaymentsTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  showConfirmModal: (record: any) => void;
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
  isShowOtherAction?: boolean;
}
const FieldOfficerTrackingRepaymentsTable: React.FC<
  AdminRepaymentsTableProps
> = ({
  data,
  loading,
  showViewModal,
  showConfirmModal,
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
      render: (_text: any, record: any) => (
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
      title: "Installment Amount",
      dataIndex: "installmentAmount", // Data key for phoneNumber
      key: "installmentAmount",
      align: "center",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate", // Data key for email
      key: "dueDate",
      align: "center",
    },

    {
      title: "Paid On",
      dataIndex: "paidOn", // Data key for role
      key: "paidOn",
      align: "center",
    },

    {
      title: "Penalty",
      dataIndex: "penalty", // Data key for role
      key: "penalty",
      align: "center",
    },

    {
      title: "Status",
      dataIndex: "status", // Data key for role
      render: (text: string) => (
        <div
          className={`${
            text === "overdue "
              ? "text-[#EAB90A]"
              : text === "paid"
              ? "text-[#21B14C]"
              : "text-[#DD2626]"
          } capitalize`}
        >
          {text}
        </div>
      ),
      align: "center",
      key: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          <Tooltip placement="right" title="View Details">
            <ReuseButton
              onClick={() => showConfirmModal(record)}
              variant="secondary"
              className="!px-4 !py-2"
            >
              Confirm
            </ReuseButton>
          </Tooltip>
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <img src={AllIcons.eye} />
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

export default FieldOfficerTrackingRepaymentsTable;
