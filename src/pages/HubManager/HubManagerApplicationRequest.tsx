import { useState } from "react";
import { AllImages } from "../../../public/images/AllImages";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import { Link } from "react-router-dom";

const HubManagerApplicationRequest = () => {
  const { collapsed } = useAppSelector((state) => state.auth);

  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  
  console.log(searchText, page);
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
        <div className="grid grid-cols-4 gap-5 mt-5">
          {Array.from({ length: 100 }).map((_, index) => (
            <Link
              key={index}
              to={`/hubManager/applications/all-application-requests-details/${index}`}
              className="flex items-center justify-between gap-x-3 border border-gray-100 p-5 rounded-xl shadow"
            >
              <div className="flex items-center gap-x-3">
                <img
                  src={AllImages.profile}
                  alt="profile_pic"
                  className="rounded-full size-[80px]"
                />
                <div>
                  <p className="text-lg font-medium text-black">Dianne Russell</p>
                  <div className="flex items-center gap-x-5 mt-3">
                    <ReuseButton variant="secondary" className="!text-sm !px-3">
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
