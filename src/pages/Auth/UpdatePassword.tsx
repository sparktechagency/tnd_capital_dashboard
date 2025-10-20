/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Form, FormInstance } from "antd";
import { BsArrowLeft } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import ReuseButton from "../../ui/Button/ReuseButton";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import { useUpdatePasswordMutation } from "../../redux/features/auth/authApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";

const inputStructure = [
  {
    name: "password",
    type: "password",
    inputType: "password",
    placeholder: "Password",
    prefix: <RiLockPasswordFill className="mr-1 !text-black" />,
    labelClassName: "!font-medium",
    inputClassName:
      "!py-3 !rounded-xl !text-lg !text-[#40140F] !bg-[#FBE7E5] !border-none",
    rules: [{ required: true, message: "Password is required" }],
  },
  {
    name: "confirmPassword",
    type: "password",
    inputType: "password",
    placeholder: "Confirm Password",
    prefix: <RiLockPasswordFill className="mr-1" />,
    labelClassName: "!font-medium",
    inputClassName:
      "!py-3 !rounded-xl !text-lg !text-[#40140F] !bg-[#FBE7E5] !border-none",
    rules: [
      { required: true, message: "Confirm Password is required" },
      ({
        getFieldValue,
      }: {
        getFieldValue: FormInstance["getFieldValue"];
      }) => ({
        validator(_: unknown, value: string) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("Password does not match!"));
        },
      }),
    ],
  },
];

const UpdatePassword = () => {
  const router = useNavigate();
  const [form] = Form.useForm();
  const [resetPassword] = useUpdatePasswordMutation();

  const onFinish = async (values: any) => {
    console.log(values);

    const res = await tryCatchWrapper(
      resetPassword,
      {
        body: {
          ...values,
        },
      },
      "Updating..."
    );
    console.log(res, "res");

    if (res?.statusCode === 200) {
      Cookies.remove("resetPasswordToken");
      router("/sign-in");
    }
  };

  const handleNavigate = () => {
    router(-1);
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
                <h1 className="text-lg text-[#535763]">
                  <p
                    onClick={handleNavigate}
                    className="font-semibold text-black  flex items-center justify-center gap-x-1 cursor-pointer"
                  >
                    <BsArrowLeft /> Reset Password
                  </p>
                  <br />
                  <span className="block pr-8">
                    Your password must be 8-10 character long.
                  </span>
                </h1>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm form={form} handleFinish={onFinish} className="!mt-4">
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
                Reset Password
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default UpdatePassword;
