import { Form, Upload } from "antd";
import { useAppSelector } from "../../redux/hooks";
import Topbar from "../../Components/Shared/Topbar";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseSelect from "../../ui/Form/ReuseSelect";
import ReuseInput from "../../ui/Form/ReuseInput";
import { AllIcons } from "../../../public/images/AllImages";
import ReuseButton from "../../ui/Button/ReuseButton";

const FieldOfficerEditLoanApply = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const inputStructure = [
    {
      name: "name",
      inputType: "text",
      placeholder: "Full Name",
      label: "Full Name",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Name is required" }],
    },
    {
      name: "phoneNumber",
      inputType: "text",
      label: "Phone Number",
      placeholder: "Phone Number",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Name is required" }],
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
      name: "Home Address",
      inputType: "text",
      label: "Home Address",
      placeholder: "Home Address",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Email is required" }],
    },
    {
      options: [
        {
          label: "Cost plus profit (CPP) Murabaha Pareonal",
          value: "Cost plus profit (CPP) Murabaha Pareonal",
        },
        {
          label: "Cost plus profit (CPP) Murabaha Bussiness",
          value: "Cost plus profit (CPP) Murabaha Bussiness",
        },
        {
          label: "Thrive Together Partnership (TTP) Mudaraba",
          value: "Thrive Together Partnership (TTP) Mudaraba",
        },
      ],
      placeholder: "Select Gender",
      isSelect: true,
      name: "gender",
      label: "Type of Financing Requested",
    },

    {
      name: "nid",
      inputType: "text",
      label: "Purpose of Financing",
      placeholder: "Type financing",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Email is required" }],
    },
    {
      name: "nid",
      inputType: "text",
      label: "Loan Amount Requested",
      placeholder: "Type Amount",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Email is required" }],
    },

    {
      options: [
        {
          label: "Employed",
          value: "Employed",
        },
        {
          label: "Self Employed",
          value: "Self Employed",
        },
        {
          label: "Unemployed",
          value: "Unemployed",
        },
        {
          label: "Other ",
          value: "Other ",
        },
      ],
      placeholder: "Select Gender",
      isSelect: true,
      name: "gender",
      label: "Type of Financing Requested ",
    },

    {
      name: "nid",
      inputType: "text",
      label: "Where are you located",
      placeholder: "City, State, Country ",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Email is required" }],
    },
    {
      name: "nid",
      inputType: "text",
      label: "Monthly Income",
      placeholder: "Type income ",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Email is required" }],
    },

    {
      options: [
        {
          label: "Phone ",
          value: "Phone ",
        },
        {
          label: "Email",
          value: "Email",
        },
      ],
      placeholder: "Select Gender",
      isSelect: true,
      name: "gender",
      label: "Preferred Contact  ",
    },
    {
      options: [
        {
          label: "Yearly ",
          value: "Yearly ",
        },
        {
          label: "M onthly",
          value: "monthly",
        },
      ],
      placeholder: "Select Gender",
      isSelect: true,
      name: "gender",
      label: "Term   ",
    },

    {
      name: "nid",
      inputType: "text",
      label: "NID",
      placeholder: "NID Number",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Email is required" }],
    },
    {
      name: "hubId",
      inputType: "text",
      label: "Hub ID",
      placeholder: "Hub ID Number",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Email is required" }],
    },
    {
      name: "hubId",
      inputType: "text",
      label: "Start Date",
      placeholder: "Hub ID Number",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Email is required" }],
    },
    {
      name: "hubId",
      inputType: "text",
      label: "End Date",
      placeholder: "Hub ID Number",
      labelClassName: "!font-normal !text-sm",
      rules: [{ required: true, message: "Email is required" }],
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}></Topbar>
      <div className="mt-10">
        <p className="text-xl font-medium">Lone Apply</p>

        <div>
          <ReusableForm
            form={form}
            handleFinish={onFinish}
            className="!px-32 !mt-10"
          >
            <div className="grid grid-cols-2 gap-x-52">
              {inputStructure.map((input, index) => (
                <>
                  {input.isSelect ? (
                    <>
                      <ReuseSelect
                        name={input.name}
                        label={input.label}
                        Typolevel={4}
                        labelClassName="!text-sm"
                        selectClassName=""
                        options={input.options}
                      />
                    </>
                  ) : (
                    <>
                      <ReuseInput
                        key={index}
                        name={input?.name}
                        label={input.label}
                        Typolevel={4}
                        inputType={input.inputType}
                        placeholder={input.placeholder}
                        labelClassName={input.labelClassName}
                        rules={input.rules}
                        inputClassName="!bg-[#F2F2F2] !border-none !rounded-lg !h-12 !text-sm placeholder:!text-[#B4BCC9] placeholder:text-xs"
                      />
                    </>
                  )}
                </>
              ))}

              <Form.Item name="image" className="mb-8 w-full">
                <label htmlFor="image" className="block text-sm mb-3">
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
                      <img src={AllIcons.upload} alt="" />
                    </p>
                    <p className="text-black font-medium">Upload</p>
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
                Update Application
              </ReuseButton>
            </div>
          </ReusableForm>
        </div>
      </div>
    </div>
  );
};

export default FieldOfficerEditLoanApply;
