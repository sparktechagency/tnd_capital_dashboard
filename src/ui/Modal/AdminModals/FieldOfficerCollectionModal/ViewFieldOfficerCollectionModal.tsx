/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ModalItemStyle from "../../../../utils/ModalItemStyle";

const ViewFieldOfficerCollectionModal = ({
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
            Field Officer Record
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
              title={"Hub ID:"}
              value={currentRecord?.hubId || "12D89"}
            />
            <ModalItemStyle
              title={"Spoke Id:"}
              value={currentRecord?.spokeId || "12D89"}
            />
            <ModalItemStyle
              title={"Set Location:"}
              value={currentRecord?.address}
            />
            <ModalItemStyle
              title={"Collected Amount:"}
              value={currentRecord?.collected_amount}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewFieldOfficerCollectionModal;
