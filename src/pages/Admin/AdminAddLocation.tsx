import { Form } from "antd";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import { useCreateLocationProfileMutation } from "../../redux/features/admin/adminLocationProfile/adminLocationProfileApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useNavigate } from "react-router-dom";

const AdminAddLocation = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const navigation = useNavigate();

  const inputStructure = [
    {
      name: "hubUid",
      inputType: "text",
      placeholder: "Location Name",
      label: "Hub ID",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Location Name is required" }],
    },
    {
      name: "locationName",
      inputType: "text",
      placeholder: "Location Name",
      label: "Location Name",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Location Name is required" }],
    },
    {
      name: "locationId",
      inputType: "text",
      label: "Location ID",
      placeholder: "Location ID",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Location ID is required" }],
    },
    {
      name: "email",
      inputType: "email",
      label: "Email",
      placeholder: "Email",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Email is required" }],
    },
    {
      name: "address",
      inputType: "text",
      label: "Address",
      placeholder: "Address",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Address is required" }],
    },
    {
      name: "phoneNumber",
      inputType: "text",
      label: "Phone Number",
      placeholder: "Phone Number",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Phone Number is required" }],
    },
    {
      name: "currency",
      inputType: "text",
      label: "Currency",
      placeholder: "Currency",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Currency is required" }],
    },
    {
      name: "excelFormula",
      inputType: "text",
      label: "Excel Formula",
      placeholder: "Excel Formula",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Excel Formula is required" }],
    },
  ];

  // api calling
  const [createLocationProfile] = useCreateLocationProfileMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      createLocationProfile,
      { body: values },
      "Creating..."
    );

    if (res?.statusCode === 201) {
      form.resetFields();
    }
  };

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}></Topbar>

      <div className="mt-4">
        <p className="text-xl font-medium ">Location Information</p>

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
                inputClassName="!bg-[#F2F2F2] !border-none !rounded-lg !h-12 !text-sm placeholder:!text-[#B4BCC9] placeholder:text-xs"
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-20 px-28 mt-20">
            <ReuseButton
              variant="outline"
              onClick={() => navigation(-1)}
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
            >
              Cancel
            </ReuseButton>
            <ReuseButton
              variant="secondary"
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
              htmlType="submit"
            >
              Submit
            </ReuseButton>
          </div>
        </ReusableForm>
      </div>
    </div>
  );
};

export default AdminAddLocation;
