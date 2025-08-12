/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Tooltip } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { AllIcons } from "../../../public/images/AllImages";

interface AdminLocationProfileTable {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  setPage?: (page: number) => void; // Function to handle pagination
  showViewModal: (record: any) => void;
  showEditModal: (record: any) => void;

  page?: number;
  total?: number;
  limit?: number;
}
const AdminLocationProfileTable: React.FC<AdminLocationProfileTable> = ({
  data,
  loading,
  setPage,
  showViewModal,
  showEditModal,

  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Location Name",
      dataIndex: "locationName",
      key: "locationName",
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
    },
    // {
    //   title: "Type",
    //   dataIndex: "role",
    //   key: "role",
    //   filters: [
    //     { text: "Officer", value: "officer" },
    //     { text: "Manager", value: "manager" },
    //   ],
    //   onFilter: (value: string, record: any) => record.role === value,
    //   render: (text: string) => <span className="capitalize">{text}</span>,
    // },
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

          <Tooltip placement="left" title="Block">
            <button
              className="!p-0 !bg-transparent !border-none cursor-pointer"
              onClick={() => showEditModal(record)}
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

export default AdminLocationProfileTable;
