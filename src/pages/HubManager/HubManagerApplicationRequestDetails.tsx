/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AllImages } from "../../../public/images/AllImages";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ConfirmationModal from "../../ui/Modal/User/ConfirmationModal";

const HubManagerApplicationRequestDetails = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [viewConfirmation, setViewConfirmation] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);

  const handleAccept = (data: any) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}></Topbar>

      <div className="mt-10 shadow border border-gray-100 rounded-xl p-5">
        <p className="text-2xl font-medium">Apply Request</p>
        <div className="flex items-center justify-between gap-x-3 mt-8">
          <div className="flex items-center gap-x-3">
            <img
              src={AllImages.profile}
              alt="profile_pic"
              className="rounded-full size-[80px]"
            />
            <div>
              <p className="text-lg font-medium text-black">Dianne Russell</p>
              <div className="flex items-center gap-x-5 mt-3">
                <ReuseButton
                  onClick={() => {
                    setCurrentRecord(null);
                    setViewConfirmation(true);
                  }}
                  variant="secondary"
                  className="!text-sm "
                >
                  Accept
                </ReuseButton>
                <ConfirmationModal
                  currentRecord={currentRecord}
                  isConfirmationModalVisible={viewConfirmation}
                  handleCancel={() => setViewConfirmation(false)}
                  handleAccept={handleAccept}
                />
                <ReuseButton className="!text-sm ">Delete</ReuseButton>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
            <p>
              <span className="font-medium">Name:</span> Dianne Russell
            </p>
            <p>
              <span className="font-medium">Phone:</span> +983 54594586
            </p>

            <p>
              <span className="font-medium">Email:</span>{" "}
              diannerussell@gmail.com
            </p>
            <p>
              <span className="font-medium">Home Address:</span> New York, NY
              10003, USA
            </p>

            <p>
              <span className="font-medium">Type of Financing Requested:</span>{" "}
              Cost plus profit (CPP) Murabaha Bussiness
            </p>
            <p>
              <span className="font-medium">Purpose of Financing:</span>{" "}
              Bussines
            </p>

            <p>
              <span className="font-medium">Loan Amount Requested:</span>{" "}
              $50,000
            </p>
            <p>
              <span className="font-medium">Employment Status:</span> Others
            </p>

            <p>
              <span className="font-medium">Where are you located:</span> New
              York, NY 10003
            </p>
            <p>
              <span className="font-medium">Monthly Income:</span> $10,000
            </p>

            <p>
              <span className="font-medium">Preferred Contact Method:</span>{" "}
              0160000000
            </p>
            <p>
              <span className="font-medium">Term:</span> Monthly
            </p>

            <p>
              <span className="font-medium">NID:</span> 0000000000
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span className="text-yellow-500 font-semibold">Pending</span>
            </p>

            <p>
              <span className="font-medium">Monthly Amount:</span> 5,000
            </p>
            <p>
              <span className="font-medium">Start Date:</span> 10.10.2025
            </p>
            <p>
              <span className="font-medium">End Date:</span> 10.10.2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubManagerApplicationRequestDetails;
