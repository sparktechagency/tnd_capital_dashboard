/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
import dayjs from "dayjs";
import { AllIcons, AllImages } from "../../../public/images/AllImages";
import { getImageUrl } from "../../helpers/config/envConfig";
import ReuseTable from "../../utils/ReuseTable";
import { MdBlock } from "react-icons/md";

interface AdminHROfficersTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  showUnblockModal: (record: any) => void;
  showEditUserModal: (record: any) => void;
  showBlockModal: (record: any) => void;
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
  isShowOtherAction?: boolean;
}
const HROfficersTable: React.FC<AdminHROfficersTableProps> = ({
  data,
  loading,
  showViewModal,
  showUnblockModal,
  showEditUserModal,
  showBlockModal,
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
      title: "#FO.ID",
      dataIndex: "uid",
      key: "foId",
      align: "center",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text: string) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
      key: "date",
      align: "center",
    },

    {
      title: "Address",
      dataIndex: ["customFields", "homeAddress"],
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
                onClick={() => showUnblockModal(record)}
              >
                <img src={AllIcons.unblock} className="" />
              </button>
            </Tooltip>
          ) : (
            <Tooltip placement="left" title="Block">
              <button
                className="!p-0 !bg-transparent !border-none cursor-pointer"
                onClick={() => showBlockModal(record)}
              >
                <MdBlock style={{ fontSize: "20px" }} />
              </button>
            </Tooltip>
          )}
          
          <Tooltip placement="right">
            <button
              onClick={() => showEditUserModal(record)}
              className="!p-0 !bg-transparent !border-none !text-secondary-color cursor-pointer"
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

export default HROfficersTable;
