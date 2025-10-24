/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from "../../../../lib/utils";

const AdminOverviewCard = ({
  cards,
  className,
  subClassName,
}: {
  cards: any[];
  className?: string;
  subClassName?: string;
}) => {
  // const { data, isFetching } = useGetCountsQuery({});

  return (
    <div
      className={cn(
        // "flex flex-col lg:flex-row gap-1 lg:gap-x-10 mb-5",
        "grid lg:grid-cols-4 grid-cols-2 gap-6 mb-5",
        className
      )}
    >
      {cards.map((item) => (
        <div
          key={item.id}
          className={`flex rounded-2xl w-full my-2 lg:my-0 items-center justify-center flex-1 border border-[#D1D1D1]`}
          style={{
            backgroundColor: item.background,
          }}
        >
          <div
            className={cn("flex items-center p-6 w-full gap-x-6", subClassName)}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="dashboard-number text-lg sm:text-xl lg:text-[28px] font-semibold text-secondary-color capitalize tracking-wider truncate">
                {item.name === "Earnings" ? `${item.count} KWD` : item.count}
              </p>
              <p className="text-sm sm:text-base text-base-color mb-1 tracking-tight truncate">
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
