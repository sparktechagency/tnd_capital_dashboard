import { Form } from "antd";
import Topbar from "../../Components/Shared/Topbar";
import { PlusIcon } from "../../Components/svg/leads";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";

const AdminLeadInformation = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  const inputStructure = [
    {
      name: "name",
      inputType: "text",
      placeholder: "Full Name",
      label: "Full Name",
      labelClassName: "!font-normal",
      rules: [{ required: true, message: "Name is required" }],
    },
    {
      name: "phoneNumber",
      inputType: "text",
      label: "Phone Number",
      placeholder: "Phone Number",
      labelClassName: "!font-normal",
      rules: [{ required: true, message: "Name is required" }],
    },
    {
      name: "email",
      inputType: "email",
      label: "Email",
      placeholder: "Email",
      labelClassName: "!font-normal",
      rules: [{ required: true, message: "Email is required" }],
    },
    {
      name: "Home Address",
      inputType: "text",
      label: "Home Address",
      placeholder: "Home Address",
      labelClassName: "!font-normal",
      rules: [{ required: true, message: "Email is required" }],
    },
  ];

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <Topbar collapsed={collapsed}>
        <div className="lg:ml-[1000px]">
          <ReuseButton
            children="Add Features"
            // url="/admin/lead-information"
            icon={PlusIcon()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
          />
        </div>
      </Topbar>

      <ReusableForm form={form} handleFinish={onFinish} className="!mt-20 !px-32">
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

        <ReuseButton
          variant="secondary"
          htmlType="submit"
          className="!py-6 !px-9 !font-bold rounded-lg"
          // icon={allIcons.arrowRight}
        >
          Sign In
        </ReuseButton>
      </ReusableForm>
    </div>
  );
};

export default AdminLeadInformation;
