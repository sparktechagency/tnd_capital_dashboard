import { Modal } from "antd";
import ModalItemStyle from "../../../utils/ModalItemStyle";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { AllImages } from "../../../../public/images/AllImages";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ViewAdminApplicationModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}: {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}) => {
  const customFields = currentRecord?.clientId?.customFields;

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={500}
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-xl text-secondary-color text-center">
            Application Details
          </h3>

          <div className="flex flex-col justify-center items-center gap-2 mt-3">
            {/* Avatar */}
            <img
              src={
                customFields?.image
                  ? getImageUrl() + customFields?.image
                  : AllImages.profile
              }
              alt={customFields?.name}
              className="size-[180px] object-cover rounded mt-6"
            />
          </div>

          {/* Personal Information Section */}
          <div className="mt-6 px-3">
            <h4 className="text-lg text-primary-color">Personal Information</h4>

            <ModalItemStyle
              title="Client ID"
              value={currentRecord?.clientId?.uid}
            />
            <ModalItemStyle
              title="Name"
              value={currentRecord?.clientId?.customFields?.name}
            />
            <ModalItemStyle
              title="Email"
              value={currentRecord?.clientId?.email}
            />
            <ModalItemStyle
              title="Phone Number"
              value={currentRecord?.clientId?.phoneNumber}
            />
            <ModalItemStyle
              title="Home Address"
              value={currentRecord?.clientId?.customFields?.homeAddress}
            />
            <ModalItemStyle
              title="You Located"
              value={currentRecord?.whereAreYouLocated}
            />
            <ModalItemStyle
              title="Preferred Contact"
              value={currentRecord?.preferredContact}
            />
            <ModalItemStyle
              title="NID"
              value={currentRecord?.clientId?.customFields?.nid}
            />
          </div>

          {/* Loan Information Section */}
          <div className="mt-0 px-3">
            <h4 className="text-lg text-primary-color">Loan Information</h4>

            <ModalItemStyle title="Application ID" value={currentRecord?.uid} />

            <ModalItemStyle
              title="Purpose of Financing"
              value={currentRecord?.purposeOfFinancing}
            />
            <ModalItemStyle
              title="Type of Financing Requested"
              value={currentRecord?.typeofFinancingRequested}
            />
            <ModalItemStyle
              title="Loan Amount Requested"
              value={currentRecord?.loanAmountRequested}
            />
            <ModalItemStyle
              title="Monthly Income"
              value={currentRecord?.monthlyIncome}
            />
            <ModalItemStyle title="Term" value={currentRecord?.term} />
            <ModalItemStyle
              title="Start Date"
              value={currentRecord?.startDate?.split("T")[0]}
            />
            <ModalItemStyle
              title="End Date"
              value={currentRecord?.endDate?.split("T")[0]}
            />
            <ModalItemStyle
              title="Status"
              className={
                currentRecord?.loanStatus === "approved"
                  ? "text-green-500 capitalize" 
                  : "text-yellow-500 capitalize"
              }
              value={currentRecord?.loanStatus}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewAdminApplicationModal;
