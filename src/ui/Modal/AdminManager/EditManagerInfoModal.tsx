import { Form } from "antd";
import { useAppSelector } from "../../../redux/hooks";
import Topbar from "../../../Components/Shared/Topbar";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import { useEffect } from "react";
import { useUpdateLocationProfileMutation } from "../../../redux/features/admin/adminLocationProfile/adminLocationProfileApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

const EditManagerInfoModal = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  const data = JSON.parse(localStorage.getItem("currentRecord") || "{}");

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

  useEffect(() => {
    form.setFieldsValue({
      hubUid: data.hubId?.uid,
      locationName: data.locationName,
      locationId: data.locationId,
      email: data.email,
      address: data.address,
      phoneNumber: data.phoneNumber,
      currency: data.currency,
      excelFormula: data.excelFormula,
    });
  }, [data, form]);

  // api calling
  const [updateLocationProfile] = useUpdateLocationProfileMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      updateLocationProfile,
      { body: values, params: data._id },
      "Updating..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
    }
  };

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}></Topbar>

      <div className="mt-4">
        <p className="text-xl font-medium ">Edit Location Information</p>

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
              htmlType="submit"
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

export default EditManagerInfoModal;
