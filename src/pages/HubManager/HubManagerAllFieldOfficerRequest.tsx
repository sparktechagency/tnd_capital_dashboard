import { useState } from "react";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";

const HubManagerAllFieldOfficerRequest = () => {
  const { collapsed } = useAppSelector((state) => state.auth);

  const [searchText, setSearchText] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  console.log(searchText, page);
  return (
    <div>
      <Topbar collapsed={collapsed}>
        <div className="flex items-center  gap-x-10 py-5">
          <ReuseSearchInput
            placeholder="Search"
            setSearch={setSearchText}
            setPage={setPage}
          />
        </div>
      </Topbar>

      <div>
        
      </div>
    </div>
  );
};

export default HubManagerAllFieldOfficerRequest;
