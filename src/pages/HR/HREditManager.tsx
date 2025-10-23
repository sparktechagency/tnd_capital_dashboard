import { Form, Upload } from "antd";
import { AllIcons } from "../../../public/images/AllImages";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseSelect from "../../ui/Form/ReuseSelect";
import { validationRules } from "../../utils/formValidations";

const HREditManager = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  const inputStructure = [
    {
      name: "name",
      inputType: "text",
      placeholder: "Full Name",
      label: "Full Name",
      labelClassName: "!font-normal !text-sm",
      rules: validationRules.fullName,
    },
    {
      name: "phoneNumber",
      inputType: "text",
      label: "Phone Number",
      placeholder: "Phone Number (e.g., +96512345678)",
      labelClassName: "!font-normal !text-sm",
      rules: validationRules.phoneNumber,
    },
    {
      name: "email",
      inputType: "email",
      label: "Email",
      placeholder: "Email",
      labelClassName: "!font-normal !text-sm",
      rules: validationRules.email,
    },
    {
      name: "homeAddress",
      inputType: "text",
      label: "Home Address",
      placeholder: "Home Address",
      labelClassName: "!font-normal !text-sm",
      rules: validationRules.address,
    },
    {
      name: "nid",
      inputType: "text",
      label: "NID",
      placeholder: "NID Number",
      labelClassName: "!font-normal !text-sm",
      rules: validationRules.nid,
    },
    {
      name: "hubId",
      inputType: "text",
      label: "Hub ID",
      placeholder: "Hub ID Number",
      labelClassName: "!font-normal !text-sm",
      rules: validationRules.text("Hub ID", 3, 50),
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
        <p className="text-xl font-medium ">Edit Manager Information </p>

        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="!px-32 !mt-10"
        >
          <div className="w-[480px] mx-auto">
            <ReuseSelect
              name="role"
              label="Add Manager Type"
              options={[
                { value: "Manager", label: "General Manager" },
                { value: "Field Officer", label: "Branch Manager" },
              ]}
            />
          </div>
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

            <Form.Item name="image" className="mb-8 w-full">
              <label htmlFor="image" className="block text-sm mb-3">
                Upload CV
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
                  <p className="text-black font-medium">Upload CV</p>
                </div>
              </Upload>
            </Form.Item>
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
              Submit
            </ReuseButton>
          </div>
        </ReusableForm>
      </div>
    </div>
  );
};

export default HREditManager;
