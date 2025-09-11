/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import ReuseTable from "../../utils/ReuseTable";
import { getImageUrl } from "../../helpers/config/envConfig";
import dayjs from "dayjs";
import ReuseButton from "../Button/ReuseButton";

interface AdminRepaymentsTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  currentRecord: any;
  page?: number;
  total?: number;
  limit?: number;
  isShowOtherAction?: boolean;
}
const FieldOfficerRepaymentsTable: React.FC<AdminRepaymentsTableProps> = ({
  data,
  loading,
  showViewModal,
  setPage,
  currentRecord,
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
      ),
    },
    {
      title: "Installment Amount",
      dataIndex: "installmentAmount",
      key: "installmentAmount",
      align: "center",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      render: (text: string) => (
        <span className="capitalize">{dayjs(text).format("DD-MM-YYYY")}</span>
      ),
      key: "dueDate",
      align: "center",
    },

    {
      title: "Paid On",
      dataIndex: "paidOn",
      render: (text: string) => (
        <span className="capitalize">{dayjs(text).format("DD-MM-YYYY")}</span>
      ),
      key: "paidOn",
      align: "center",
    },

    {
      title: "Penalty",
      dataIndex: "penalty",
      key: "penalty",
      align: "center",
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) => (
        <div
          className={`${
            text === "overdue"
              ? "text-[#EAB90A]"
              : text === "paid"
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
          {!currentRecord?.isConfirm && (
            <Tooltip placement="right" title="View Details">
              <ReuseButton variant="secondary" className="!w-fit !px-2 !py-1">
                confirm
              </ReuseButton>
            </Tooltip>
          )}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <img src={AllIcons.eye} />
            </button>
          </Tooltip>
          <Tooltip placement="right" title="Edit">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <img src={AllIcons.pen} />
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

export default FieldOfficerRepaymentsTable;
