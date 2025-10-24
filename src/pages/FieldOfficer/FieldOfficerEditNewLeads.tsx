import { Form, Upload } from "antd";
import upload from "../../../public//images/icons/Upload.svg";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";

const FieldOfficerEditNewLeads = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  const inputStructure = [
    {
      name: "name",
      inputType: "text",
      placeholder: "Full Name",
      label: "Full Name",
      labelClassName: "!font-normal !text-sm",
      rules: [
        { required: true, message: "Full Name is required" },
        { min: 2, message: "Name must be at least 2 characters" },
        { max: 100, message: "Name must not exceed 100 characters" },
        {
          pattern: /^[a-zA-Z\s]+$/,
          message: "Name can only contain letters and spaces",
        },
      ],
    },
    {
      name: "phoneNumber",
      inputType: "text",
      label: "Phone Number",
      placeholder: "Phone Number (e.g., +96512345678)",
      labelClassName: "!font-normal !text-sm",
      rules: [
        { required: true, message: "Phone Number is required" },
        {
          pattern: /^\+?[1-9]\d{7,14}$/,
          message: "Please enter a valid phone number (8-15 digits)",
        },
        { min: 8, message: "Phone number must be at least 8 digits" },
        { max: 16, message: "Phone number must not exceed 16 characters" },
      ],
    },
    {
      name: "email",
      inputType: "email",
      label: "Email",
      placeholder: "Email",
      labelClassName: "!font-normal !text-sm",
      rules: [
        { required: true, message: "Email is required" },
        { type: "email", message: "Please enter a valid email address" },
        {
          pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Invalid email format",
        },
      ],
    },
    {
      name: "homeAddress",
      inputType: "text",
      label: "Home Address",
      placeholder: "Home Address",
      labelClassName: "!font-normal !text-sm",
      rules: [
        { required: true, message: "Home Address is required" },
        { min: 10, message: "Address must be at least 10 characters" },
        { max: 200, message: "Address must not exceed 200 characters" },
      ],
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
        <p className="text-xl font-medium ">Lead Input</p>

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
                rules={input.rules as any}
                inputClassName="!bg-[#F2F2F2] !border-none !rounded-xl !h-[52px] placeholder:!text-[#B4BCC9] placeholder:text-xs"
              />
            ))}

            <Form.Item name="image" className="mb-8 w-full">
              <label htmlFor="image" className="block text-sm font-medium mb-3">
                Upload Picture
              </label>
              <Upload
                maxCount={1}
                listType="text"
                accept="image/*"
                multiple={false}
                customRequest={(options) => {
                  setTimeout(() => {
                    options.onSuccess?.("ok");
                  }, 1000);
                }}
                className=""
              >
                <div className="lg:w-[320px] p-4 border border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center bg-transparent hover:border-primary transition-all duration-300 cursor-pointer">
                  <p className="text-3xl mb-2">
                    <img src={upload} alt="" />
                  </p>
                  <p className="text-black font-medium">
                    Upload your region image here
                  </p>
                </div>
              </Upload>
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-x-20 px-28 mt-20">
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

export default FieldOfficerEditNewLeads;
