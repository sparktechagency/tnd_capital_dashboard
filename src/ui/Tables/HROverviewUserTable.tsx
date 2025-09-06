/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import { AllImages } from "../../../public/images/AllImages";
import { getImageUrl } from "../../helpers/config/envConfig";
import ReuseTable from "../../utils/ReuseTable";

interface AdminAdminFieldOfficerTableProps {
  data: any[];
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
      render: () => <span>{dayjs().format("DD-MM-YYYY")}</span>,
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
      title: "Type",
      dataIndex: "role",
      key: "role",
      align: "center",
      filters: [
        { text: "Spoke Manager", value: "spokeManager" },
        { text: "Hub Manager", value: "hubManager" },
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
