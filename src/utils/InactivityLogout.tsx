/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Or useContext for session management
import { clearAuth } from "../redux/features/auth/authSlice";

// TypeScript types
interface InactivityLogoutProps {
  timeoutDuration?: number;
}

const InactivityLogout: React.FC<InactivityLogoutProps> = ({
  timeoutDuration = 20000, // Set default timeout as 20 seconds for testing purposes
}) => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState<any>(null);

  useEffect(() => {
    // Function to handle user inactivity (logout)
    console.log(" in inactivity timer");
    const handleInactivity = (): void => {
      dispatch(clearAuth()); // Dispatch your logout action
    };

    // Set timeout for inactivity (default is 20 seconds here)
    const inactivityTimer = setTimeout(handleInactivity, timeoutDuration);

    // Clear timer on user interaction
    const resetInactivityTimer = (): void => {
      if (timer) clearTimeout(timer); // Clear previous timer
      setTimer(setTimeout(handleInactivity, timeoutDuration)); // Reset timer
    };

    // Listen for user activity (page route changes, button clicks, etc.)
    window.addEventListener("mousemove", resetInactivityTimer);
    window.addEventListener("keydown", resetInactivityTimer);

    return () => {
      if (timer) clearTimeout(timer); // Cleanup on component unmount
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keydown", resetInactivityTimer);
    };
  }, [dispatch, timeoutDuration]); // Remove timer from the dependency array

  return null; // This component does not need to render anything
};

export default InactivityLogout;
