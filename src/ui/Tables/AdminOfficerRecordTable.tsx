import { Space, Tooltip } from "antd";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import ReuseTable from "../../utils/ReuseTable";
import { getImageUrl } from "../../helpers/config/envConfig";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface AdminOfficerRecordTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
  isShowOtherAction?: boolean;
}

const AdminOfficerRecordTable: React.FC<AdminOfficerRecordTableProps> = ({
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
      dataIndex: ["fieldOfficer", "customFields", "name"],
      key: "name",
      render: (_text: string, record: any) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src={
                record?.fieldOfficer?.customFields?.image
                  ? getImageUrl() + record?.fieldOfficer?.customFields?.image
                  : AllImages.profile
              }
              alt={_text}
              style={{
                width: 45,
                height: 45,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span>{_text}</span>
          </div>
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: ["fieldOfficer", "phoneNumber"], // Data key for phoneNumber
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: ["fieldOfficer", "email"], // Data key for email
      render: (fieldOfficer: string) => {
        return <span>{fieldOfficer}</span>;
      },
      align: "center",
    },

    {
      title: "Date",
      dataIndex: "paidOn", // Data key for role
      key: "paidOn",
      align: "center",
    },

    {
      title: "Collected Amount",
      dataIndex: "totalInstallmentAmount", // Data key for collected_amount
      render: (collected_amount: string) => <span>$ {collected_amount}</span>,
      key: "totalInstallmentAmount",
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

export default AdminOfficerRecordTable;
