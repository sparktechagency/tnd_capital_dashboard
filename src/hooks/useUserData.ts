// hooks/useUserData.ts
import Cookies from "js-cookie";
import { useMemo } from "react";
import { IUser } from "../types";
import { decodedToken } from "../utils/jwt";

const useUserData = () => {
  const token = Cookies.get("crm_accessToken");

  const user = useMemo(() => {
    if (!token) return null;

    const decoded = decodedToken(token) as IUser | null;
    return decoded;
  }, [token]);

  return user;
};

export default useUserData;
