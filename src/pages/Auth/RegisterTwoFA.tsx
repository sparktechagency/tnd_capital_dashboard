/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useTwoFaRegistrationMutation } from "../../redux/features/auth/authApi";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Container from "../../ui/Container";

const inputStructure = [
  {
    name: "username",
    inputType: "text",
    placeholder: "User Name",
    labelClassName: "!font-bold",
    rules: [{ required: true, message: "User Name is required" }],
  },
  {
    name: "password",
    inputType: "password",
    placeholder: "Password",
    labelClassName: "!font-bold",
    rules: [{ required: true, message: "Password is required" }],
  },
];

const RegisterTwoFa = () => {
  const [form] = Form.useForm();
  const router = useNavigate();
  const [twoFaRegistration] = useTwoFaRegistrationMutation();

  const handleNavigate = () => {
    router("/two-fa-login");
  };
  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      twoFaRegistration,
      { body: values },
      "Two Factor Authentication ..."
    );

    if (res?.data) {
      Cookies.remove("crm_accessToken");
      router(`/`, { replace: true });
    }
  };

  return (
    <div className="!bg-blue-800">
      <Container>
        <div className="min-h-screen flex flex-col justify-center items-center lg:w-[440px] mx-auto lg:px-10 px-5">
          <div className="w-full sm:w-[70%] lg:w-full mx-auto">
            <ReusableForm
              form={form}
              handleFinish={onFinish}
              className="!mt-20"
            >
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={4}
                  inputType={input.inputType}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  rules={input.rules}
                  inputClassName="!h-11"
                />
              ))}
              <div className="flex items-center justify-end mb-6">
                <p
                  onClick={handleNavigate}
                  className="text-[#fff] cursor-pointer hover:underline font-medium"
                >
                  Login
                </p>
              </div>
              <ReuseButton
                variant="secondary"
                htmlType="submit"
                className="!py-6 !px-9 !font-bold rounded-lg"
                // icon={allIcons.arrowRight}
              >
                Register
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default RegisterTwoFa;
