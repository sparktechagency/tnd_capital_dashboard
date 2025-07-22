"use client";
import { Form } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { MdVerifiedUser } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReuseButton from "../../ui/Button/ReuseButton";
import Cookies from "js-cookie";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import {
  useOtpVerifyMutation,
  useResendOTPMutation,
} from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { AllImages } from "../../../public/images/AllImages";
import { BsArrowLeft } from "react-icons/bs";

const OTPVerify = () => {
  const router = useNavigate();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const phoneNumber = Cookies.get("classaty_phoneNumber");

  const [otpMatch] = useOtpVerifyMutation();
  const [resendOtp] = useResendOTPMutation();

  const handleOTPSubmit = async () => {
    // if (otp.length === 6) {
    //   const res = await tryCatchWrapper(
    //     otpMatch,
    //     {
    //       body: {
    //         otp: Number(otp),
    //       },
    //     },
    //     "Verifying..."
    //   );

    //   const allowedRoles = ["supperAdmin", "school"];
    //   const userRole = res?.data?.user?.role;

    //   if (res?.statusCode === 200 && allowedRoles.includes(userRole)) {
    //     Cookies.set("classaty_accessToken", res?.data?.accessToken, {
    //       path: "/",
    //       expires: 365,
    //       secure: false,
    //     });

    //     Cookies.remove("classaty_signInToken");
    //     Cookies.remove("classaty_phoneNumber");

    //     setOtp("");
    //     router("/", { replace: true });
    //   } else if (res?.statusCode === 200 && !allowedRoles.includes(userRole)) {
    //     setOtp("");
    //     toast.error("Access Denied", {
    //       duration: 2000,
    //     });
    //   }
    // }
    navigate("/reset-password");
  };

  const handleNavigate = () => {
    navigate(-1);
  };

  const handleResendOtp = async () => {
    console.log("Resending OTP...");
    await tryCatchWrapper(resendOtp, {}, "Resending OTP...");
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
            <div className="flex flex-col justify-center items-center">
              <div className="mt-12">
                <h1 className="text-lg text-[#535763] mb-3">
                  <p
                    onClick={handleNavigate}
                    className="font-semibold text-black  flex items-center justify-center gap-x-1 cursor-pointer"
                  >
                    <BsArrowLeft /> Verify OTP
                  </p>
                  <br />
                  <span className="pr-8 block">
                    Please enter the otp we have sent you in your email.
                  </span>
                </h1>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <Form layout="vertical" className="bg-transparent w-full">
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[40px] !h-[50px] md:!w-[60px] md:!h-[50px] lg:!h-[70px] text-[20px] sm:text-[30px] !bg-secondary-color/10 border-2 !border-secondary-color
                      rounded-lg mr-[10px] sm:mr-[20px] !text-base-color "
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="!py-6 !px-9 !font-bold rounded-lg"
                onClick={handleOTPSubmit}
              >
                Verify OTP
              </ReuseButton>
            </Form>

            <div className="flex justify-center gap-2 py-1 mt-5">
              <p>Didn’t receive code?</p>
              <p
                className="!text-base-color !underline font-semibold cursor-pointer"
                onClick={handleResendOtp}
              >
                Click to resend
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default OTPVerify;
