import { AllIcons } from "../../../../../public/images/AllImages";
import { useGetCountsQuery } from "../../../../redux/features/adminOverview/adminOverviewApi";
import SpinLoader from "../../../../ui/Spiner";

const AdminOverviewCard = () => {
  // const { data, isFetching } = useGetCountsQuery({});

  const cards = [
    {
      id: 1,
      background: "#FFFFFF",
      name: "Total Collection",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.collection} className="size-7" alt="icon" />
        </div>
      ),
      count: "$2,000",
    },
    {
      id: 2,
      background: "#FFFFFF",
      name: "Total Application",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.application} className="size-7" alt="icon" />
        </div>
      ),
      count: "100",
    },
    {
      id: 3,
      background: "#FFFFFF",
      name: "Overdue",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.overdue} className="size-7" alt="icon" />
        </div>
      ),
      count: "$2,000K",
    },
    {
      id: 3,
      background: "#FFFFFF",
      name: "Total Clients",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.clients} className="size-7" alt="icon" />
        </div>
      ),
      count: "806",
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row gap-1 lg:gap-x-10 mb-5">
      {/* Company  */}
      {cards.map((item) => (
        <div
          key={item.id}
          className={`flex rounded-2xl w-full my-2 lg:my-0 items-center justify-center flex-1 border border-[#D1D1D1]`}
          style={{
            backgroundColor: item.background,
          }}
        >
          <div className="flex items-center p-6 w-full gap-x-6">
            <div className="">{item.icon}</div>
            <div className=" w-fit ">
              <p className="text-lg sm:text-xl lg:text-[36px] font-semibold text-secondary-color capitalize tracking-wider">
                {item.name === "Earnings" ? `${item.count} KWD` : item.count}
              </p>
              <p className="text-lg text-base-color mb-1  tracking-tight">
                {item.name}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOverviewCard;
