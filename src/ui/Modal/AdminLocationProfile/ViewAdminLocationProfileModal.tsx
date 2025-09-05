import { Modal } from "antd";
import ModalItemStyle from "../../../utils/ModalItemStyle";
import dayjs from "dayjs";

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
      width={700}
    >
      <div className="py-5">
        <div className="text-base-color">
          <h3 className="text-xl text-secondary-color text-center">
            Location Profile
          </h3>

          <div className="mt-6 px-3">
            <ModalItemStyle
              title="Location Name"
              value={currentRecord?.locationName}
            />
            <ModalItemStyle title="Location ID" value={"QCJ5+82 Dhaka"} />
            <ModalItemStyle title={"Email"} value={currentRecord?.email} />
            <ModalItemStyle
              title={"Phone Number"}
              value={currentRecord?.phoneNumber}
            />
            <ModalItemStyle
              title={"Date"}
              value={dayjs(currentRecord?.createdAt).format("DD-MM-YYYY")}
            />
            <ModalItemStyle title={"Address"} value={currentRecord?.address} />
            <ModalItemStyle title={"Currency"} value={currentRecord?.currency} />
            <ModalItemStyle
              title={"Excel Formula"}
              value={currentRecord?.excelFormula}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewAdminLocationProfileModal;
