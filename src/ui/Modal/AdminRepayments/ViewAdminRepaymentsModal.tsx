import { Modal } from "antd";
import ModalItemStyle from "../../../utils/ModalItemStyle";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ViewAdminRepaymentsModal = ({
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
            Repayments Details
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
            <ModalItemStyle title={"City:"} value={currentRecord?.city} />
            <ModalItemStyle
              title={"Loan Amount:"}
              value={currentRecord?.loanAmount}
            />
            <ModalItemStyle title={"Term:"} value={currentRecord?.term} />
            <ModalItemStyle
              title={"Installment Amount:"}
              value={currentRecord?.installmentAmount}
            />
            <ModalItemStyle
              title={"Due Date:"}
              value={currentRecord?.dueDate}
            />
            <ModalItemStyle title={"Paid On:"} value={currentRecord?.paidOn} />
            <ModalItemStyle
              title={"Penalty :"}
              value={currentRecord?.penalty}
            />
            <ModalItemStyle title={"Status:"} value={currentRecord?.status} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewAdminRepaymentsModal;
