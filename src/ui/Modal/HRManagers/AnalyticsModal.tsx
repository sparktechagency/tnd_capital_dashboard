import { Modal } from "antd";
import { AllIcons } from "../../../../public/images/AllImages";
import { cn } from "../../../lib/utils";
import { useSeeSpokeManagerAnalyticsQuery } from "../../../redux/features/HubManager/hubManagerDashbaordApi";
import Loading from "../../Loading";

/* eslint-disable @typescript-eslint/no-explicit-any */
const AnalyticsModal = ({
  isAnyalyticsModalOpen,
  handleCancel,
  currentRecord,
}: {
  isAnyalyticsModalOpen: boolean;
  handleCancel: () => void;
  currentRecord: any;
}) => {
  const { data: spokeManagerCount, isLoading } =
    useSeeSpokeManagerAnalyticsQuery(currentRecord?._id);

  const cards = [
    {
      id: 1,
      background: "#FFFFFF",
      name: "Total Collections",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.collection} className="size-7" alt="icon" />
        </div>
      ),
      count: spokeManagerCount?.data?.todayCollection,
    },

    {
      id: 2,
      background: "#FFFFFF",
      name: "Overdue",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.overdue} className="size-7" alt="icon" />
        </div>
      ),
      count: spokeManagerCount?.data?.overdue,
    },

    {
      id: 3,
      background: "#FFFFFF",
      name: "Field Officers",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.fieldOfficer} className="size-7" alt="icon" />
        </div>
      ),
      count: spokeManagerCount?.data?.fieldOfficers,
    },

    {
      id: 4,
      background: "#FFFFFF",
      name: "Clients",
      icon: (
        <div className="size-[64px] flex items-center justify-center rounded-full bg-[#DDE0FF]">
          <img src={AllIcons.clients} className="size-7" alt="icon" />
        </div>
      ),
      count: spokeManagerCount?.data?.clients,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Modal
      open={isAnyalyticsModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      width={800}
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-xl font-semibold text-secondary-color text-center">
            Analytics Modal
          </h3>
        </div>
        <div className="mt-6 ">
          <div className="grid grid-cols-2 gap-6">
            {cards.map((item) => (
              <div
                key={item.id}
                className={`flex rounded-2xl w-full my-2 lg:my-0 items-center justify-center flex-1 border border-[#D1D1D1]`}
                style={{
                  backgroundColor: item.background,
                }}
              >
                <div
                  className={cn(
                    "flex items-center p-6 w-full gap-x-6"
                    // subClassName
                  )}
                >
                  <div className="">{item.icon}</div>
                  <div className=" w-fit ">
                    <p className="text-lg sm:text-xl lg:text-[36px] font-semibold text-secondary-color capitalize tracking-wider">
                      {item.name === "Earnings"
                        ? `${item.count} KWD`
                        : item.count}
                    </p>
                    <p className="text-lg text-base-color mb-1  tracking-tight">
                      {item.name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AnalyticsModal;
