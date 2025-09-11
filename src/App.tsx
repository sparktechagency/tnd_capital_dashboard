import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "./App.css";
import Main from "./Components/Layout/Main";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");

    // Check if expireTime exists and if it has passed
    if (!expireTime || Number(expireTime) < Date.now()) {
      console.log("log out!");
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    // Set up interval to check for inactivity every 5 seconds
    const interval = setInterval(() => {
      checkForInactivity();
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const updateExpireTime = () => {
    // Update expire time to 10 minutes from now
    const expireTime = Date.now() + 10 * 60 * 1000; // Expiry time in 10 minutes
    localStorage.setItem("expireTime", expireTime.toString());
  };

  useEffect(() => {
    // Set event listeners to reset expire time on user interaction
    updateExpireTime();

    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    return () => {
      // Cleanup event listeners on component unmount
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, []);

  if (loggedIn === false) {
    Cookies.remove("crm_accessToken");
    window.location.href = "/sign-in";
    window.location.reload();
  }

  return (
    <div>
      <Main />
    </div>
  );
}

export default App;
