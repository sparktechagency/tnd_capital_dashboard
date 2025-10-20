/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form } from "antd";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import ReuseButton from "../../ui/Button/ReuseButton";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";
import Cookies from "js-cookie";

const inputStructure = [
  {
    name: "email",
    type: "email",
    inputType: "email",
    label: "Email",
    placeholder: "Email",
    labelClassName: "!font-bold",
    prefix: <MdEmail className="mr-1" />,
    inputClassName:
      "!py-3 !rounded-xl !text-lg !text-[#40140F] !bg-[#FBE7E5] !border-none",
    rules: [{ required: true, message: "Email is required" }],
  },
];

const ForgetPassword = () => {
  const router = useNavigate();
  const [form] = Form.useForm();

  const [forgotPassword] = useForgotPasswordMutation();

  const onFinish = async (values: any) => {
    const data = {
      ...values,
    };

    const res = await tryCatchWrapper(
      forgotPassword,
      { body: data },
      "Sending OTP..."
    );

    if (res?.data?.forgotPasswordToken) {
      Cookies.set("forgotPasswordToken", res?.data?.forgotPasswordToken);
    }

    router("/forgot-password/verify-otp");
  };

  return (
    <div className="!bg-primary-color">
      <Container>
        <div className="min-h-screen flex flex-col justify-center items-center lg:w-[440px] mx-auto lg:px-10">
          <img
            src={AllImages.logo}
            alt="logo"
            className="w-auto h-32 object-cover"
          />
          <div className="w-full sm:w-[70%] md:w-full mx-auto">
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="mt-12">
                <h1 className="text-lg  text-[#535763] mb-5">
                  <span className="font-semibold text-center text-black mb-5 block">
                    Forget Password
                  </span>{" "}
                  <br />
                  <span className="pr-8 block">
                    Please enter your email address to reset your password.
                  </span>
                </h1>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm form={form} handleFinish={onFinish} className="">
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={4}
                  inputType={input.inputType}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  rules={input.rules}
                  inputClassName="!text-black !bg-transparent placeholder:!text-black"
                />
              ))}

              <ReuseButton
                variant="secondary"
                htmlType="submit"
                className="!py-6 !px-9 !font-bold rounded-lg"
                // icon={allIcons.arrowRight}
              >
                Send OTP
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ForgetPassword;
