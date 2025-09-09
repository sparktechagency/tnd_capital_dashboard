/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { getImageUrl } from "../../../helpers/config/envConfig";
import ModalItemStyle from "../../../utils/ModalItemStyle";
import { AllImages } from "../../../../public/images/AllImages";

const ViewLeadsModal = ({
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
              src={
                currentRecord?.customFields?.image
                  ? getImageUrl() + currentRecord?.customFields?.image
                  : AllImages.profile
              }
              alt={currentRecord?.customFields?.name}
              className="size-[180px] object-cover rounded mt-6"
            />
          </div>
          <div className="mt-6 px-3">
            <ModalItemStyle title="ID" value={currentRecord?.uid} />
            <ModalItemStyle
              title="Name"
              value={currentRecord?.customFields?.name}
            />
            <ModalItemStyle title={"Email"} value={currentRecord?.email} />
            <ModalItemStyle
              title={"Phone Number"}
              value={currentRecord?.phoneNumber}
            />
            <ModalItemStyle
              title={"Home Address:"}
              value={currentRecord?.customFields?.homeAddress}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewLeadsModal;
