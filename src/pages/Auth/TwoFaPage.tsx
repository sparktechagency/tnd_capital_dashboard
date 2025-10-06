import { Link } from "react-router-dom";

const TwoFaPage = () => {
  return (
    <div className="flex items-center justify-center bg-blue-800 text-white min-h-screen">
      <div>
        <h2 className="text-xl font-medium">Welcome to the Two Fa Page </h2>
        <Link to="/two-fa-login">
          <button className="bg-white text-black mt-2 px-4 py-2 font-medium rounded-xl shadow cursor-pointer">OK</button>
        </Link>
      </div>
    </div>
  );
};

export default TwoFaPage;
