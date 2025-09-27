/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
// import { MdBlock } from "react-icons/md";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import ReuseTable from "../../utils/ReuseTable";
import { getImageUrl } from "../../helpers/config/envConfig";
import { MdBlock } from "react-icons/md";

interface AdminLeadsTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  showDeleteModal?: (record: any) => void;
  showBlockModal?: (record: any) => void;
  showUnblockModal?: (record: any) => void;
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
  isShowOtherAction?: boolean;
}
const LeadsTable: React.FC<AdminLeadsTableProps> = ({
  data,
  loading,
  showViewModal,
  showBlockModal,
  showUnblockModal,
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
                record?.customFields?.image
                  ? getImageUrl() + record?.customFields?.image
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
            <span>{record?.customFields?.name}</span>
          </div>
        );
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber", // Data key for phoneNumber
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email", // Data key for email
      key: "email",
      align: "center",
    },

    {
      title: "Address",
      dataIndex: ["customFields", "homeAddress"], // Data key for role
      key: "address",
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

          {record?.status === "blocked" ? (
            <Tooltip placement="left" title="Unblock">
              <button
                className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
                onClick={() => showUnblockModal?.(record)}
              >
                <img src={AllIcons.unblock} className="" />
              </button>
            </Tooltip>
          ) : (
            <Tooltip placement="left" title="Block">
              <button
                className="!p-0 !bg-transparent !border-none cursor-pointer"
                onClick={() => showBlockModal?.(record)}
              >
                <MdBlock style={{ fontSize: "20px" }} />
              </button>
            </Tooltip>
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
        scroll={{ x: true }}
        keyValue={"email"}
      />
    </div>
  );
};

export default LeadsTable;
