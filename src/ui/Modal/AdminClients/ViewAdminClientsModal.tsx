import { Modal } from "antd";
import ModalItemStyle from "../../../utils/ModalItemStyle";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ViewAdminClientsModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}: {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={480}
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-xl text-secondary-color text-center">
            Clients Details
          </h3>

          <div className="flex flex-col justify-center items-center gap-2 mt-3">
            {/* Avatar */}
            <img
              src={currentRecord?.image}
              alt={currentRecord?.fullName}
              className="size-[180px] object-cover rounded mt-6"
            />
          </div>
          <div className="mt-6 px-3">
            <ModalItemStyle title="Name" value={currentRecord?.fullName} />
            <ModalItemStyle title={"Email"} value={currentRecord?.email} />
            <ModalItemStyle
              title={"Phone Number"}
              value={currentRecord?.phoneNumber}
            />
            <ModalItemStyle
              title={"Home Address:"}
              value={currentRecord?.address}
            />
            <ModalItemStyle
              title={"Purpose of Financing:"}
              value={currentRecord?.purposeOfFinancing}
            />
            <ModalItemStyle
              title={"Type of Financing Requested:"}
              value={currentRecord?.typeOfFinancing}
            />
            <ModalItemStyle
              title={"Loan Amount Requested:"}
              value={currentRecord?.loanAmountRequested}
            />
            <ModalItemStyle
              title={"You located:"}
              value={currentRecord?.location}
            />
            <ModalItemStyle
              title={"Monthly Income:"}
              value={currentRecord?.monthlyIncome}
            />
            <ModalItemStyle
              title={"Preferred Contact :"}
              value={currentRecord?.preferredContact}
            />
            <ModalItemStyle title={"Term:"} value={currentRecord?.term} />{" "}
            <ModalItemStyle title={"NID:"} value={currentRecord?.nid} />
            <ModalItemStyle
              title={"Monthly Income:"}
              value={currentRecord?.startDate}
            />
            <ModalItemStyle
              title={"Start Date:"}
              value={currentRecord?.purposeOfFinancing}
            />
            <ModalItemStyle
              title={"End Date:"}
              value={currentRecord?.endDate}
            />
            <ModalItemStyle title={"Status:"} value={currentRecord?.status} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewAdminClientsModal;
