/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
import { AllIcons } from "../../../public/images/AllImages";
import ReuseTable from "../../utils/ReuseTable";
import { MdBlock } from "react-icons/md";

interface AdminAdminFieldOfficerTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  showDeleteModal: (record: any) => void;
  showSpokeModal?: (record: any | undefined) => void | undefined;
  showBlockModal?: (record: any) => void;
  showUnblockModal?: (record: any) => void;
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
  isShowOtherAction?: boolean;
  isPlusButtonShow?: boolean;
}
const AdminFieldOfficerTable: React.FC<AdminAdminFieldOfficerTableProps> = ({
  data,
  loading,
  showViewModal,
  showDeleteModal,
  showSpokeModal,
  showBlockModal,
  showUnblockModal,
  setPage,
  page,
  total,
  limit,
  isPlusButtonShow = false,
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
      title: "#FO.ID",
      dataIndex: "foId", // Data key for phoneNumber
      key: "foId",
      align: "center",
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
      title: "Date",
      dataIndex: "date", // Data key for role
      key: "date",
      align: "center",
    },

    {
      title: "Address",
      dataIndex: "address", // Data key for role
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

          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
              onClick={() => showDeleteModal(record)}
            >
              <img src={AllIcons.deleteIcon} />
            </button>
          </Tooltip>

          <Tooltip placement="left" title="Unblock">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer hidden"
              onClick={() => showUnblockModal?.(record)}
            >
              <img src={AllIcons.unblock} className="" />
            </button>
          </Tooltip>

          <Tooltip placement="left" title="Block">
            <button
              className="!p-0 !bg-transparent !border-none cursor-pointer"
              onClick={() => showBlockModal?.(record)}
            >
              <MdBlock style={{ fontSize: "20px" }} />
            </button>
          </Tooltip>

          {isPlusButtonShow && (
            <Tooltip placement="right" title="View Details">
              <button
                className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
                onClick={() => showSpokeModal?.(record)}
              >
                <img src={AllIcons.roundedPlus} />
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

export default AdminFieldOfficerTable;
