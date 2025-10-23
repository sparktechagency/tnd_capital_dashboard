/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AllImages } from "../../../public/images/AllImages";
import Topbar from "../../Components/Shared/Topbar";
import { getImageUrl } from "../../helpers/config/envConfig";
import { useApplicationActionMutation } from "../../redux/features/HubManager/hubManagerApplicationApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ConfirmationModal from "../../ui/Modal/User/ConfirmationModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const HubManagerApplicationRequestDetails = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [viewConfirmation, setViewConfirmation] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);

  const data = localStorage.getItem("clientId");
  const pareseData = JSON.parse(data || "{}");
  const client = pareseData?.clientId;
  const navigation = useNavigate();

  const [applicationAction] = useApplicationActionMutation();

  const handleAccept = async () => {
    const res = await tryCatchWrapper(
      applicationAction,
      { body: { action: "approved", loanId: pareseData?._id } },
      "Accepting..."
    );
    if (res.statusCode === 200) {
      localStorage.removeItem("clientId");
      setViewConfirmation(false);
      navigation(-1);
    }
  };

  const handleDelete = async () => {
    const res = await tryCatchWrapper(
      applicationAction,
      { body: { action: "rejected", loanId: pareseData?._id } },
      "Rejecting ..."
    );
    if (res.statusCode === 200) {
      localStorage.removeItem("clientId");
      setViewConfirmation(false);
      navigation(-1);
    }
  };

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}></Topbar>

      <div className="mt-10 shadow border border-gray-100 rounded-xl p-5">
        <p className="text-2xl font-medium">Apply Request</p>
        <div className="flex items-center justify-between gap-x-3 mt-8">
          <div className="flex items-center gap-x-3">
            <img
              src={
                pareseData?.clientId?.customFields?.image
                  ? getImageUrl() + pareseData?.clientId?.customFields?.image
                  : AllImages.profile
              }
              alt="profile_pic"
              className="rounded-full size-[80px]"
            />
            <div>
              <p className="text-lg font-medium text-black">
                {pareseData?.clientId?.customFields?.name}
              </p>
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
                <ReuseButton
                  onClick={() => handleDelete()}
                  className="!text-sm "
                >
                  Reject
                </ReuseButton>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {client?.customFields?.name}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {client?.phoneNumber}
            </p>

            <p>
              <span className="font-medium">Email:</span> {client?.email}
            </p>
            <p>
              <span className="font-medium">Home Address:</span>{" "}
              {client?.customFields?.homeAddress}
            </p>

            <p>
              <span className="font-medium">Type of Request:</span>{" "}
              {pareseData?.typeofFinancingRequested}
            </p>
            <p>
              <span className="font-medium">Purpose of Request:</span>

              {pareseData?.purposeOfFinancing}
            </p>

            <p>
              <span className="font-medium">Amount Requested:</span>{" "}
              {pareseData?.loanAmountRequested}
            </p>
            <p>
              <span className="font-medium">Employment Status:</span>{" "}
              {pareseData?.employmentStatus}
            </p>

            <p>
              <span className="font-medium">Where are you located:</span>
              {pareseData?.whereAreYouLocated}
            </p>
            <p>
              <span className="font-medium">Monthly Income:</span>{" "}
              {pareseData?.monthlyIncome}
            </p>

            <p>
              <span className="font-medium">Preferred Contact Method:</span>{" "}
              {pareseData?.preferredContact}
            </p>
            <p>
              <span className="font-medium">Term:</span> {pareseData?.term}
            </p>

            <p>
              <span className="font-medium">NID:</span> {pareseData?.nid}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span className="text-yellow-500 font-semibold">
                {pareseData?.loanStatus}
              </span>
            </p>

            <p>
              <span className="font-medium">Monthly Amount:</span>{" "}
              {pareseData?.installMentAmount}
            </p>
            <p>
              <span className="font-medium">Start Date:</span>{" "}
              {dayjs(pareseData?.startDate).format("DD-MM-YYYY")}
            </p>
            <p>
              <span className="font-medium">End Date:</span>{" "}
              {dayjs(pareseData?.endDate).format("DD-MM-YYYY")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubManagerApplicationRequestDetails;
