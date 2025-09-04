import { Modal } from "antd";
import ModalItemStyle from "../../../utils/ModalItemStyle";
import { AllImages } from "../../../../public/images/AllImages";
import { getImageUrl } from "../../../helpers/config/envConfig";
import dayjs from "dayjs";

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
            <img
              src={
                currentRecord?.client?.customFields?.image
                  ? getImageUrl() + currentRecord?.client?.customFields?.image
                  : AllImages.profile
              }
              alt={currentRecord?.client?.customFields?.name}
              className="size-[180px] object-cover rounded mt-6"
            />
          </div>
          <div className="mt-6 px-3">
            <ModalItemStyle
              title="Name"
              value={currentRecord?.client?.customFields?.name}
            />
            <ModalItemStyle
              title={"Email"}
              value={currentRecord?.client?.email}
            />
            <ModalItemStyle
              title={"Phone Number"}
              value={currentRecord?.client?.phoneNumber}
            />
            <ModalItemStyle
              title={"City"}
              value={currentRecord?.client?.customFields?.homeAddress}
            />
            <ModalItemStyle
              title={"Loan Amount"}
              value={currentRecord?.loan?.loanAmountRequested}
            />
            <ModalItemStyle title={"Term"} value={currentRecord?.loan?.term} />
            <ModalItemStyle
              title={"Installment Amount"}
              value={currentRecord?.installmentAmount}
            />
            <ModalItemStyle
              title={"Due Date"}
              value={dayjs(currentRecord?.dueDate).format("YYYY-MM-DD")}
            />
            <ModalItemStyle
              title={"Paid On"}
              value={dayjs(currentRecord?.paidOn).format("YYYY-MM-DD")}
            />
            <ModalItemStyle title={"Penalty"} value={currentRecord?.penalty} />
            <ModalItemStyle
              title={"Status"}
              value={currentRecord?.status}
              className={`${
                currentRecord?.status === "overdue"
                  ? "text-[#EAB90A]"
                  : currentRecord?.status === "paid"
                  ? "text-[#21B14C]"
                  : "text-[#DD2626]"
              } capitalize`}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewAdminRepaymentsModal;
