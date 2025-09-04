/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useState } from "react";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import { useCreateLoanMutation } from "../../../redux/features/admin/adminLoan/adminLoanApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

const AddAdminLoan = ({
  isViewModalVisible,
  handleCancel,
}: {
  isViewModalVisible: boolean;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const [features, setFeatures] = useState<string[]>([""]);

  // api calling

  const [createLoan] = useCreateLoanMutation();

  const onFinish = async (values: any) => {
    const newData = {
      title: values.planName,
      features: features,
    };

    const res = await tryCatchWrapper(
      createLoan,
      { body: newData },
      "Creating..."
    );

    if (res?.statusCode === 201) {
      handleCancel();
    }
  };

  const handleAdd = () => {
    setFeatures([...features, ""]);
  };

  const handleChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
    form.setFieldsValue({ features: newFeatures }); // Sync with the form
  };

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={480}
    >
      <div className="py-5">
        <ReusableForm form={form} handleFinish={onFinish} className="">
          <ReuseInput
            name="planName"
            label="Plan Name"
            Typolevel={4}
            inputType="text"
            placeholder="Type Name"
            labelClassName="!font-normal !text-sm"
            rules={[{ required: true, message: "Name is required" }]}
            inputClassName="!bg-[#F2F2F2] !border-none !rounded placeholder:!text-[#B4BCC9] placeholder:text-xs h-11"
          />

          {/* Facilities */}
          <Form.Item
            label="Features"
            name="features"
            style={{ fontWeight: "500" }}
          >
            <>
              {features.map((feature, index) => (
                <ReuseInput
                  key={index}
                  name={`features[${index}]`} // Correct dynamic name for AntD form
                  label={`Feature ${index + 1}`}
                  value={feature}
                  Typolevel={4}
                  inputType="text"
                  placeholder={`Feature ${index + 1}`}
                  onChange={(e) => handleChange(index, e.target.value)}
                  labelClassName="!font-normal !text-sm"
                  rules={[{ required: true, message: "Feature is required" }]}
                  inputClassName="!bg-[#F2F2F2] !border-none !rounded placeholder:!text-[#B4BCC9] placeholder:text-xs h-11"
                />
              ))}
              <ReuseButton
                onClick={handleAdd}
                className="!font-semibold rounded-lg !text-sm"
              >
                + Add more Features
              </ReuseButton>
            </>
          </Form.Item>

          {/* ✅ Submit button */}
          <div className="mt-4">
            <ReuseButton
              variant="secondary"
              className="!font-semibold rounded-lg !text-sm"
              htmlType="submit"
            >
              Add
            </ReuseButton>
          </div>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default AddAdminLoan;
