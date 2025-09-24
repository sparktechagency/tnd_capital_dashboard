/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllImages } from "../../../public/images/AllImages";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import { Link, useLocation } from "react-router-dom";
import { useGetAllHubManagerLoanApplicationQuery } from "../../redux/features/HubManager/hubManagerApplicationApi";
import { getImageUrl } from "../../helpers/config/envConfig";
import Loading from "../../ui/Loading";

const HubManagerApplicationRequest = () => {
  const { collapsed } = useAppSelector((state) => state.auth);

  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { pathname } = useLocation();
  const newPath = pathname.split("/")[1];

  const { data, isLoading } = useGetAllHubManagerLoanApplicationQuery({
    page,
    limit: 12,
    searchTerm: searchText,
    supervisorApproval: newPath === "supervisor" ? "pending" : "approved",
    hubManagerApproval: "pending",
  });

  const application = data?.data;

  if (isLoading) return <Loading />;
  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}>
        <div className="flex items-center  gap-x-10 py-5">
          <ReuseSearchInput
            placeholder="Search"
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </Topbar>

      <div className="mt-10 shadow border border-gray-100 rounded-xl p-5">
        <p className="text-xl font-medium">Apply Request</p>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mt-5">
          {application?.result.map((item: any, index: number) => (
            <Link
              onClick={() =>
                localStorage.setItem("clientId", JSON.stringify(item))
              }
              key={index}
              to={`/${newPath}/applications/all-application-requests-details/${item._id}`}
              className="flex items-center justify-between gap-x-3 border border-gray-100 p-5 rounded-xl shadow"
            >
              <div className="flex items-center gap-x-3">
                <img
                  src={
                    item?.clientId?.customFields?.image
                      ? getImageUrl() + item?.clientId?.customFields?.image
                      : AllImages.profile
                  }
                  alt="profile_pic"
                  className="rounded-full size-[80px]"
                />
                <div>
                  <p className="text-lg font-medium text-black">
                    {item?.clientId?.customFields?.name}
                  </p>
                  <div className="flex items-center gap-x-5 mt-3">
                    <ReuseButton
                      onClick={() =>
                        localStorage.setItem("clientId", JSON.stringify(item))
                      }
                      variant="secondary"
                      className="!text-sm !px-3"
                    >
                      See Details
                    </ReuseButton>
                    <ReuseButton className="!text-sm !px-6">Delete</ReuseButton>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HubManagerApplicationRequest;
