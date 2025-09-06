import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const auth_url = "/auth";
const user_url = "/users";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (req) => {
        return {
          url: `${auth_url}/login`,
          method: "POST",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),

    forgotPassword: build.mutation({
      query: (req) => {
        return {
          url: `${auth_url}/forgot_password`,
          method: "POST",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),

    otpVerify: build.mutation({
      query: (req) => {
        return {
          url: `${auth_url}/verify_otp`,
          method: "POST",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),

    resendOTP: build.mutation({
      query: () => {
        return {
          url: `${auth_url}/resend_otp`,
          method: "POST",
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),

    updatePassword: build.mutation({
      query: (req) => {
        return {
          url: `${auth_url}/reset_password`,
          method: "POST",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.auth],
    }),

    getProfile: build.query({
      query: () => {
        return {
          url: `${user_url}/profile`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.auth],
    }),

    updateProfile: build.mutation({
      query: (req) => {
        return {
          url: `${user_url}/update_profile`,
          method: "PATCH",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.auth],
    })
  }),
});

export const { useLoginMutation, useOtpVerifyMutation, useResendOTPMutation, useForgotPasswordMutation, useUpdatePasswordMutation, useGetProfileQuery, useUpdateProfileMutation } =
  authApi;

export default authApi;
