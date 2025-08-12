import { Modal } from "antd";
import ModalItemStyle from "../../../utils/ModalItemStyle";
import ReuseButton from "../../Button/ReuseButton";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ViewAdminClientsModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  isPrintButtonShow = false,
}: {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
  isPrintButtonShow?: boolean;
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={580}
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-xl text-secondary-color text-center">
            Client Details
          </h3>

          {/* Avatar */}
          <div className="flex flex-col justify-center items-center gap-2 mt-3">
            <img
              src={currentRecord?.image}
              alt={currentRecord?.fullName}
              className="size-[180px] object-cover rounded mt-6"
            />
          </div>

          <div className="mt-6 px-3 space-y-6">
            {/* Personal Information */}
            <div>
              <h4 className="text-lg font-semibold border-b pb-1 mb-3">
                Personal Information
              </h4>
              <ModalItemStyle title="Name" value={currentRecord?.fullName} />
              <ModalItemStyle title="Email" value={currentRecord?.email} />
              <ModalItemStyle
                title="Phone Number"
                value={currentRecord?.phoneNumber}
              />
              <ModalItemStyle
                title="Home Address"
                value={currentRecord?.address}
              />
              <ModalItemStyle
                title="You located"
                value={currentRecord?.location}
              />
              <ModalItemStyle
                title="Preferred Contact"
                value={currentRecord?.preferredContact}
              />
              <ModalItemStyle title="NID" value={currentRecord?.nid} />
            </div>

            {/* Loan Information */}
            <div>
              <h4 className="text-lg font-semibold border-b pb-1 mb-3">
                Loan Information
              </h4>
              <ModalItemStyle
                title="Purpose of Financing"
                value={currentRecord?.purposeOfFinancing}
              />
              <ModalItemStyle
                title="Type of Financing Requested"
                value={currentRecord?.typeOfFinancing}
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
                value={currentRecord?.startDate}
              />
              <ModalItemStyle title="End Date" value={currentRecord?.endDate} />
              <ModalItemStyle title="Status" value={currentRecord?.status} className="capitalize"/>
            </div>
          </div>

          {/* Print Button */}
          {isPrintButtonShow && (
            <div className="w-56 mx-auto mt-6">
              <ReuseButton disabled variant="secondary">
                <span>Print</span>
              </ReuseButton>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ViewAdminClientsModal;
