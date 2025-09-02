/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const decodedToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error: any) {
    Cookies.remove("crm_accessToken");
    localStorage.removeItem("persist:crm");
    window.location.reload();
    return null; // Return null instead of crashing the app
  }
};
