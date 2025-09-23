/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  FC,
  ReactNode,
} from "react";
import { Table, Input, Form, Modal, FormInstance } from "antd";
import type { InputRef } from "antd";
import type { ColumnType } from "antd/es/table";
import Topbar from "../../../Components/Shared/Topbar";
import { useAppSelector } from "../../../redux/hooks";

interface LoanRecord {
  key: string;
  principal: number | string;
  months: number | string;
  totalRepayment: string;
  monthlyInstallment: string;
  grossProfit: string;
  initialHere: string;
}

type EditableTableProps = {
  dataIndex: keyof LoanRecord;
  title: ReactNode;
  editable: boolean;
  record: LoanRecord;
  handleSave: (record: LoanRecord) => void;
};

interface LoanCalculationProps {
  isLoanCalculatorModalVisible: boolean;
  handleCancel: () => void;
}

interface EditableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
}

const EditableContext = React.createContext<FormInstance<any> | null>(null);

const EditableRow: FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: FC<EditableTableProps & { children: ReactNode }> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form?.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form?.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: false }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24, cursor: "pointer" }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

// Formula function
const calculateLoan = (principal: number, months: number) => {
  const extraCharge = months > 6 ? (months - 6) * 0.018 * principal : 0;
  const monthlyInstallment = (1.35 * principal + 19 + extraCharge) / months;
  const totalRepayment = monthlyInstallment * months;
  const grossProfit = totalRepayment - principal;

  return {
    monthlyInstallment: monthlyInstallment.toFixed(2),
    totalRepayment: totalRepayment.toFixed(2),
    grossProfit: grossProfit.toFixed(2),
  };
};

const LoanCalculation = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  // Initial table rows with formula calculation
  const [dataSource, setDataSource] = useState<LoanRecord[]>(() => {
    const initialMonths = [6, 8, 10, 12, 18, 24];
    return initialMonths.map((m, i) => {
      const P = 500;
      const { totalRepayment, monthlyInstallment, grossProfit } = calculateLoan(
        P,
        m
      );
      return {
        key: (i + 1).toString(),
        principal: P,
        months: m,
        totalRepayment,
        monthlyInstallment,
        grossProfit,
        initialHere: "",
      };
    });
  });

  const handleSave = (row: LoanRecord) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];

    const principal = Number(row.principal) || 0;
    const months = Number(row.months) || 1;

    const { totalRepayment, monthlyInstallment, grossProfit } = calculateLoan(
      principal,
      months
    );

    const updatedRow: LoanRecord = {
      ...item,
      ...row,
      monthlyInstallment,
      totalRepayment,
      grossProfit,
    };

    newData.splice(index, 1, updatedRow);
    setDataSource(newData);
  };

  const columns: (ColumnType<LoanRecord> & { editable?: boolean })[] = [
    {
      title: "Principal (P)",
      dataIndex: "principal",
      render: (text: string) => <p className="text-sm">${text}</p>,
      editable: true,
    },
    {
      title: "Months (M)",
      dataIndex: "months",
      render: (text: string) => <p className="text-sm">{text}</p>,
      editable: true,
    },
    {
      title: "Total Repayment",
      dataIndex: "totalRepayment",
      render: (text: string) => <p className="text-sm">${text}</p>,
    },
    {
      title: "Monthly Installment",
      dataIndex: "monthlyInstallment",
      render: (text: string) => <p className="text-sm">${text}</p>,
    },
    {
      title: "Gross Profit",
      dataIndex: "grossProfit",
      render: (text: string) => <p className="text-sm">${text}</p>,
    },
  ];

  const mergedColumns: any = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record: LoanRecord) => ({
        record,
        editable: col.editable ?? false,
        dataIndex: col.dataIndex as keyof LoanRecord,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <section className="min-h-screen">
      <div style={{ padding: "20px" }}>
        <Topbar collapsed={collapsed}></Topbar>
        <h2 className="text-xl font-medium mb-5">Loan Calculator</h2>
        <Table
          components={{
            body: {
              row: EditableRow,
              cell: EditableCell,
            },
          }}
          bordered
          pagination={false}
          dataSource={dataSource}
          columns={mergedColumns}
        />
      </div>
    </section>
  );
};

export default LoanCalculation;
