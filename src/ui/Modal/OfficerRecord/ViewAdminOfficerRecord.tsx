import { Modal } from "antd";
import ModalItemStyle from "../../../utils/ModalItemStyle";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { AllImages } from "../../../../public/images/AllImages";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ViewAdminOfficerRecord = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}: {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}) => {
  console.log(currentRecord, "currentRecord");

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
                currentRecord?.fieldOfficer?.customFields?.image
                  ? getImageUrl() +
                    currentRecord?.fieldOfficer?.customFields?.image
                  : AllImages.profile
              }
              alt={currentRecord?.fieldOfficer?.customFields?.name}
              className="size-[180px] object-cover rounded mt-6"
            />
          </div>
          <div className="mt-6 px-3">
            <ModalItemStyle
              title="Name"
              value={currentRecord?.fieldOfficer?.customFields?.name}
            />
            <ModalItemStyle
              title={"Email"}
              value={currentRecord?.fieldOfficer?.email}
            />
            <ModalItemStyle
              title={"Phone Number"}
              value={currentRecord?.fieldOfficer?.phoneNumber}
            />
            <ModalItemStyle
              title={"Home Address:"}
              value={currentRecord?.fieldOfficer?.customFields?.homeAddress}
            />
            <ModalItemStyle
              title={"Hub ID:"}
              value={currentRecord?.fieldOfficer?.hubUid}
            />
            <ModalItemStyle
              title={"Spoke Id:"}
              value={currentRecord?.fieldOfficer?.spokeUid}
            />
            <ModalItemStyle
              title={"Set Location:"}
              value={currentRecord?.fieldOfficer?.customFields?.homeAddress}
            />
            <ModalItemStyle
              title={"Collected Amount:"}
              value={currentRecord?.totalInstallmentAmount}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewAdminOfficerRecord;
