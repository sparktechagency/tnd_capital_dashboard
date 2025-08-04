import { Form } from "antd";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";

const FieldOfficerMonthlyRepayments = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  const inputStructure = [
    {
      name: "name",
      inputType: "text",
      placeholder: "Client Name",
      label: "Loan Id",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Client Name is required" }],
    },
    {
      name: "name",
      inputType: "text",
      placeholder: "Client Name",
      label: "Client Id",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Client Name is required" }],
    },

    {
      name: "name",
      inputType: "text",
      placeholder: "Client Name",
      label: "Client Name",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Client Name is required" }],
    },
    {
      name: "phoneNumber",
      inputType: "text",
      label: "Phone Number",
      placeholder: "Type Number",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Phone Number is required" }],
    },
    {
      name: "month",
      inputType: "text",
      label: "Month",
      placeholder: "Type Month",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Month is required" }],
    },
    {
      name: "Installment Amount",
      inputType: "text",
      label: "Installment Amount",
      placeholder: "Type Amount",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "installment Amount is required" }],
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}></Topbar>

      <div className="mt-10 ">
        <p className="text-xl font-medium ">Monthly Payments </p>

        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="!px-32 !mt-10"
        >
          <div className="grid grid-cols-2 gap-x-52">
            {inputStructure.map((input, index) => (
              <ReuseInput
                key={index}
                name={input.name}
                label={input.label}
                Typolevel={4}
                inputType={input.inputType}
                placeholder={input.placeholder}
                labelClassName={input.labelClassName}
                rules={input.rules}
                inputClassName="!bg-[#F2F2F2] !border-none !rounded-xl !h-[52px] placeholder:!text-[#B4BCC9] placeholder:text-xs"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-20 lg:px-40 mt-20">
            <ReuseButton
              variant="outline"
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
            >
              Cancel
            </ReuseButton>
            <ReuseButton
              variant="secondary"
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
            >
              Submit
            </ReuseButton>
          </div>
        </ReusableForm>
      </div>
    </div>
  );
};

export default FieldOfficerMonthlyRepayments;
