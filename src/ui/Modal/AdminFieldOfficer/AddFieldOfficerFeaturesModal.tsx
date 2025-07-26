import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";

/* eslint-disable @typescript-eslint/no-explicit-any */

const inputStructure = [
  {
    name: "name",
    inputType: "text",
    placeholder: "Type..",
    label: "Input Name",
    labelClassName: "!font-normal !text-sm",
    rules: [{ required: true, message: "Name is required" }],
  },
  {
    name: "phoneNumber",
    inputType: "text",
    label: "Input Type",
    placeholder: "Type..",
    labelClassName: "!font-normal !text-sm",
    rules: [{ required: true, message: "Name is required" }],
  },
  {
    name: "email",
    inputType: "text",
    label: "Placeholder Text",
    placeholder: "Type..",
    labelClassName: "!font-normal !text-sm",
    rules: [{ required: true, message: "Email is required" }],
  },
];

const FieldOfficerFeaturesModal = ({
  isAddFeaturesModalOpen,
  handleCancel,
}: {
  isAddFeaturesModalOpen: boolean;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <Modal
      open={isAddFeaturesModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      width={480}
    >
      <div className="py-5">
        <ReusableForm form={form} handleFinish={onFinish} className="">
          {/* 🔥 Form.List handles the dynamic input sets */}
          <Form.List name="features" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <div className="space-y-4">
                {fields.map((field, index: number) => (
                  <div key={field.key} className="space-y-3 pb-4">
                    {inputStructure.map((input) => (
                      <ReuseInput
                        key={index}
                        name={[field.name, input.name]}
                        label={input.label}
                        Typolevel={4}
                        inputType={input.inputType}
                        placeholder={input.placeholder}
                        labelClassName={input.labelClassName}
                        rules={input.rules}
                        inputClassName="!bg-[#F2F2F2] !border-none !rounded placeholder:!text-[#B4BCC9] placeholder:text-xs h-10"
                      />
                    ))}
                    {/* 🗑️ Optional Remove button */}
                    {fields.length > 1 && (
                      <ReuseButton
                        variant="outline"
                        className="!text-red-500 !text-xs"
                        onClick={() => remove(field.name)}
                      >
                        Remove this Feature
                      </ReuseButton>
                    )}
                  </div>
                ))}

                {/* ➕ Add new set of inputs */}
                <ReuseButton
                  variant="outline"
                  className="!font-semibold rounded-lg !text-sm"
                  onClick={() => add()}
                >
                  + Add a more Features
                </ReuseButton>
              </div>
            )}
          </Form.List>

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

export default FieldOfficerFeaturesModal;
