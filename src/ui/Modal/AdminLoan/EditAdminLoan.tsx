/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import { useEditLoanMutation } from "../../../redux/features/admin/adminLoan/adminLoanApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

const EditAdminLoan = ({
  isEditAdminLoanModalVisible,
  handleCancel,
  currentRecord,
}: {
  isEditAdminLoanModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}) => {
  const [form] = Form.useForm();
  const [features, setFeatures] = useState<string[]>([]);

  // Set the features to currentRecord.features if available
  useEffect(() => {
    if (currentRecord && currentRecord.features) {
      setFeatures(currentRecord.features);
      form.setFieldsValue({ features: currentRecord.features });
    }
  }, [currentRecord, form]);

  // api calling

  const [editLoan] = useEditLoanMutation();

  const onFinish = async (values: any) => {
    console.log("Success:", values);

    const newData = {
      title: values.planName,
      features: features,
    };

    const res = await tryCatchWrapper(
      editLoan,
      { body: newData, params: currentRecord?._id },
      "Updating..."
    );

    if (res?.statusCode === 200) {
      handleCancel();
    }
  };

  const handleAdd = () => {
    setFeatures([...features, ""]); // Add an empty feature input
  };

  const handleChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
    form.setFieldsValue({ features: newFeatures }); // Sync with form
  };

  const handleRemove = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
    form.setFieldsValue({ features: newFeatures }); // Sync with form
  };

  return (
    <Modal
      open={isEditAdminLoanModalVisible}
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
                <div
                  key={index}
                  className="flex items-center  justify-between gap-2"
                >
                  <div className="w-full">
                    <ReuseInput
                      name={`features[${index}]`} // Using array indexing for the field name
                      label={`Feature ${index + 1}`}
                      value={feature}
                      Typolevel={4}
                      inputType="text"
                      placeholder={feature}
                      onChange={(e) => handleChange(index, e.target.value)}
                      labelClassName="!font-normal !text-sm"
                      inputClassName="!bg-[#F2F2F2] !border-none !rounded placeholder:!text-[#B4BCC9] placeholder:text-xs h-11"
                    />
                  </div>
                  <ReuseButton
                    onClick={() => handleRemove(index)}
                    className="!font-semibold rounded-lg !text-xs !text-red-500 !w-10"
                  >
                    Remove
                  </ReuseButton>
                </div>
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

export default EditAdminLoan;
