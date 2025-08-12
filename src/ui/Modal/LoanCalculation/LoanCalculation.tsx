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
import type { ColumnsType } from "antd/es/table";

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
  index: number; // or any type you want
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

const LoanCalculation: FC<LoanCalculationProps> = ({
  isLoanCalculatorModalVisible,
  handleCancel,
}) => {
  const [dataSource, setDataSource] = useState<LoanRecord[]>([
    {
      key: "1",
      principal: 500,
      months: 6,
      totalRepayment: "694.00",
      monthlyInstallment: "115.67",
      grossProfit: "194.00",
      initialHere: "",
    },
    {
      key: "2",
      principal: 500,
      months: 8,
      totalRepayment: "694.00",
      monthlyInstallment: "115.67",
      grossProfit: "194.00",
      initialHere: "",
    },
    {
      key: "3",
      principal: 500,
      months: 10,
      totalRepayment: "694.00",
      monthlyInstallment: "115.67",
      grossProfit: "194.00",
      initialHere: "",
    },
    {
      key: "4",
      principal: 500,
      months: 12,
      totalRepayment: "694.00",
      monthlyInstallment: "115.67",
      grossProfit: "194.00",
      initialHere: "",
    },
    {
      key: "5",
      principal: 500,
      months: 18,
      totalRepayment: "694.00",
      monthlyInstallment: "115.67",
      grossProfit: "194.00",
      initialHere: "",
    },
    {
      key: "6",
      principal: 500,
      months: 24,
      totalRepayment: "694.00",
      monthlyInstallment: "115.67",
      grossProfit: "194.00",
      initialHere: "",
    },
  ]);

  const handleSave = (row: LoanRecord) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
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
      editable: true,
    },
    {
      title: "Monthly Installment",
      dataIndex: "monthlyInstallment",
      render: (text: string) => <p className="text-sm">${text}</p>,
      editable: true,
    },
    {
      title: "Gross Profit",
      dataIndex: "grossProfit",
      render: (text: string) => <p className="text-sm">${text}</p>,
      editable: true,
    },
    {
      title: "Initial Here",
      dataIndex: "initialHere",
      render: (text: string) => <p className="text-sm">${text}</p>,
      editable: true,
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
    <Modal
      open={isLoanCalculatorModalVisible}
      onCancel={handleCancel}
      centered
      width={1200}
      // style={{ textAlign: "center" }}
      footer={false}
    >
      <div style={{ padding: "20px" }}>
        <h2 className="text-xl font-medium mb-5">
          Loan Collector
        </h2>
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
    </Modal>
  );
};

export default LoanCalculation;
