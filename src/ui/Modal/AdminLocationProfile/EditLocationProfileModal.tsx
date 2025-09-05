import { Form, Modal } from "antd";
import { useEffect } from "react";
import { useUpdateLocationProfileMutation } from "../../../redux/features/admin/adminLocationProfile/adminLocationProfileApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";

/* eslint-disable @typescript-eslint/no-explicit-any */
const EditLocationProfileModal = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}: {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}) => {
  const [form] = Form.useForm();

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
      hubUid: currentRecord?.hubId?.uid,
      locationName: currentRecord?.locationName,
      locationId: currentRecord?.locationId,
      email: currentRecord?.email,
      address: currentRecord?.address,
      phoneNumber: currentRecord?.phoneNumber,
      currency: currentRecord?.currency,
      excelFormula: currentRecord?.excelFormula,
    });
  }, [currentRecord, form]);

  // api calling
  const [updateLocationProfile] = useUpdateLocationProfileMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      updateLocationProfile,
      { body: values, params: currentRecord?._id },
      "Updating..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

  return (
    <Modal
      open={isEditModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={800}
    >
      <div className="mt-4">
        <p className="text-xl font-medium ">Edit Location Information</p>

        <ReusableForm form={form} handleFinish={onFinish} className=" !mt-10">
          <div className="grid grid-cols-2 gap-x-5">
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

          <div className="grid grid-cols-2 gap-x-20 px-28 my-5">
            <ReuseButton
              variant="outline"
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
    </Modal>
  );
};

export default EditLocationProfileModal;
