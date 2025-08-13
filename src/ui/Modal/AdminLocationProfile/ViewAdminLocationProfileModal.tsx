import { Modal } from "antd";
import ModalItemStyle from "../../../utils/ModalItemStyle";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ViewAdminLocationProfileModal = ({
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
      width={580}
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-xl text-secondary-color text-center">
            Location Profile
          </h3>

          {/* <div className="flex flex-col justify-center items-center gap-2 mt-3">
            <img
              src={currentRecord?.image}
              alt={currentRecord?.fullName}
              className="size-[180px] object-cover rounded mt-6"
            />
          </div> */}
          <div className="mt-6 px-3">
            <ModalItemStyle
              title="Location Name"
              value={currentRecord?.locationName}
            />
            <ModalItemStyle
              title="Location ID"
              value={"QCJ5+82 Dhaka"}
            />
            <ModalItemStyle title={"Email"} value={currentRecord?.email} />
            <ModalItemStyle
              title={"Phone Number"}
              value={currentRecord?.phoneNumber}
            />
            <ModalItemStyle title={"Date"} value={currentRecord?.date} />
            <ModalItemStyle title={"Address"} value={currentRecord?.address} />
            <ModalItemStyle title={"Currency"} value={"USD"} />
            <ModalItemStyle
              title={"Excel Formula"}
              value={"(1.35 * P + 19 + IF(m > 6, (m - 6) * 0.018 * P, 0)) / m"}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewAdminLocationProfileModal;
