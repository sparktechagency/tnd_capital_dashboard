/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useState } from "react";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";

const AddAdminLoan = ({
  isViewModalVisible,
  handleCancel,
}: {
  isViewModalVisible: boolean;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const [features, setFeatures] = useState<string[]>([""]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const handleAdd = () => {
    setFeatures([...features, ""]);
  };

  const handleChange = (index: number, value: string) => {
    const newFacilities = [...features];
    newFacilities[index] = value;
    setFeatures(newFacilities);
    form.setFieldValue("facilities", newFacilities); // sync with form
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
                  name="planName"
                  label={` Feature ${index + 1}`}
                  value={feature}
                  Typolevel={4}
                  inputType="text"
                  placeholder={`Feature ${index + 1}`}
                  onChange={(e) => handleChange(index, e.target.value)}
                  labelClassName="!font-normal !text-sm"
                  rules={[{ required: true, message: "features is required" }]}
                  inputClassName="!bg-[#F2F2F2] !border-none !rounded placeholder:!text-[#B4BCC9] placeholder:text-xs h-11"
                />
              ))}
              <ReuseButton
                onClick={handleAdd}
                className="!font-semibold rounded-lg !text-sm"
              >
                + Add a more Features
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
