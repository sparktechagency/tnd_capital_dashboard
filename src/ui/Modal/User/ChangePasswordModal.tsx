/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";

import { FaArrowLeft } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
// import { useUpdateSchoolMutation } from "../../../redux/features/school/schoolApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";

interface ChangePasswordModalProps {
  isChangePasswordModalVisible: boolean;
  handleCancel: () => void;
}

const inputStructure = [
  {
    name: "oldPassword",
    type: "password",
    inputType: "normal",
    label: "Enter old password",
    placeholder: "*******",
    labelClassName: "!font-normal",
    prefix: <MdLockOutline className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "School Name is required" }],
  },
  {
    name: "newPassword",
    type: "password",
    inputType: "normal",
    label: "Set new password",
    placeholder: "*******",
    labelClassName: "!font-normal",
    prefix: <MdLockOutline className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "School Address is required" }],
  },
  {
    name: "confirmPassword",
    type: "password",
    inputType: "normal",
    label: "Re-enter new password",
    placeholder: "*******",
    labelClassName: "!font-normal",
    prefix: <MdLockOutline className="mr-1 text-secondary-color" />,
    rules: [{ required: true, message: "Phone Number is required" }],
  },
];

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isChangePasswordModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const [changePassword] = useChangePasswordMutation();

  const handleSubmit = async (values: any) => {
    const res = await tryCatchWrapper(
      changePassword,
      {
        body: {
          ...values,
        },
      },
      "Changing Password..."
    );
    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

  return (
    <Modal
      open={isChangePasswordModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3
            onClick={handleCancel}
            className="text-lg sm:text-xl lg:text-2xl font-semibold text-secondary-color flex items-center gap-2 mb-4 cursor-pointer"
          >
            <FaArrowLeft /> Change Password
          </h3>
          <p>Your password must be 8-10 character long.</p>

          <div className="mt-5">
            <ReusableForm form={form} handleFinish={handleSubmit}>
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={5}
                  prefix={input.prefix}
                  inputType={input.inputType}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  rules={input.rules}
                />
              ))}
              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="w-full mt-4 !text-base"
              >
                Update Password
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
