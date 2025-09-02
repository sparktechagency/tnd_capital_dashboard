import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { getBaseUrl } from "../../helpers/config/envConfig";
import { tagTypesList } from "../tagTypes";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("crm_accessToken");
    const signInToken = Cookies.get("crm_signInToken");
    const forgotPasswordToken = Cookies.get("forgotPasswordToken");
    const resetPasswordToken = Cookies.get("resetPasswordToken");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    if (signInToken) {
      headers.set("Authorization", `signInToken ${signInToken}`);
    }

    if (forgotPasswordToken) {
      headers.set("Authorization", `forgotPasswordToken ${forgotPasswordToken}`);
    }

    if (resetPasswordToken) {
      headers.set("Authorization", `resetPasswordToken ${resetPasswordToken}`);
    }

    return headers;
  },
});

// const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     const res = await fetch(`${getBaseUrl()}/auth/refresh-token`, {
//       method: "POST",
//       credentials: "include",
//     });

//     const data = await res.json();
//     if (data?.data?.accessToken) {
//       const user = api.getState().auth.user;

//       api.dispatch(
//         setUser({
//           user,
//           token: data.data.accessToken,
//         })
//       );

//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       // api.dispatch(logout());
//     }
//   }

//   return result;
// };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
