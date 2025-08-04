/* eslint-disable @typescript-eslint/no-explicit-any */
import ReuseTable from "../../utils/ReuseTable";

interface AdminAdminFieldOfficerTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}
const HROverviewUserTable: React.FC<AdminAdminFieldOfficerTableProps> = ({
  data,
  loading,
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
      title: "Type",
      dataIndex: "role",
      key: "role",
      align: "center",
      filters: [
        { text: "Officer", value: "officer" },
        { text: "Manager", value: "manager" },
      ],
      onFilter: (value: string, record: any) => record.role === value,
      render: (text: string) => <span className="capitalize">{text}</span>,
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

export default HROverviewUserTable;
