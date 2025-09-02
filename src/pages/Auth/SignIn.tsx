/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeRole } from "../../redux/slice";
import ReuseButton from "../../ui/Button/ReuseButton";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const inputStructure = [
  {
    name: "email",
    inputType: "email",
    placeholder: "Email",
    labelClassName: "!font-bold",
    rules: [{ required: true, message: "Email is required" }],
  },
  {
    name: "password",
    inputType: "password",
    placeholder: "Password",
    labelClassName: "!font-bold",
    rules: [{ required: true, message: "Password is required" }],
  },
];

const SignIn = () => {
  const [form] = Form.useForm();
  const router = useNavigate();
  const [login] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const role = useAppSelector((state) => state.role);

  console.log(role);
  const handleNavigate = () => {
    navigate("/forget-password");
  };

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(login, { body: values }, "Signing In...");
    console.log("res", res);

    if (res?.data?.accessToken) {
      Cookies.set("crm_accessToken", res?.data?.accessToken, {
        path: "/",
        expires: 1,
        secure: false,
      });

      dispatch(changeRole(res?.data?.user?.role));
      router(`/${res?.data?.user?.role}/overview`, { replace: true });
    }
  };


  return (
    <div className="!bg-primary-color">
      <Container>
        <div className="min-h-screen flex flex-col justify-center items-center w-[440px] mx-auto px-10">
          <img
            src={AllImages.logo}
            alt="logo"
            className="w-auto h-32 object-cover"
          />
          <div className="w-full sm:w-[70%] lg:w-full mx-auto">
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center mb-7">
              <div className="text-center mt-12">
                <h1 className="text-sm  font-medium text-base-color mb-5">
                  Sign In to Account! <br />
                  <span>Please enter your email and password to continue.</span>
                </h1>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
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
                  className="text-[#0C2752] cursor-pointer hover:underline font-medium"
                >
                  Forgot password?
                </p>
              </div>

              <ReuseButton
                variant="secondary"
                htmlType="submit"
                className="!py-6 !px-9 !font-bold rounded-lg"
                // icon={allIcons.arrowRight}
              >
                Sign In
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignIn;
