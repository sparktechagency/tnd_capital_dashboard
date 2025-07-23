import { AllImages } from "../../../public/images/AllImages";
import AdminOverviewCard from "../../Components/Dashboard/Overview/Admin/AdminOverviewCard";

const AdminOverview = () => {
  return (
    <div>
      <div className="flex items-center">
        <img
          src={AllImages.profile}
          alt="profile_pic"
          style={{ width: "60px", height: "60px", marginRight: "10px" }}
          className="rounded-full border border-secondary-color"
        />
        <div className="flex flex-col justify-center">
          <p className="font-semibold text-xl">Hello, Emma Taylor</p>
          <p className="text-lg font-normal">
            Check your activities in this dashboard.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <AdminOverviewCard />
      </div>
    </div>
  );
};

export default AdminOverview;
