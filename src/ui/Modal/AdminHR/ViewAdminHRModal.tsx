import { Modal } from "antd";
import ModalItemStyle from "../../../utils/ModalItemStyle";
import { AllIcons, AllImages } from "../../../../public/images/AllImages";
import { getImageUrl } from "../../../helpers/config/envConfig";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ViewAdminHRModal = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  title,
}: {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
  title?: string;
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
            {title || "HR Details"}
          </h3>

          <div className="flex flex-col justify-center items-center gap-2 mt-3">
            {/* Avatar */}
            <img
              src={
                currentRecord?.customFields?.image
                  ? getImageUrl() + currentRecord?.customFields?.image
                  : AllImages.profile
              }
              alt={currentRecord?.fullName}
              className="size-[180px] object-cover rounded mt-6"
            />
          </div>
          <div className="mt-6 px-3">
            <ModalItemStyle title="#ID" value={currentRecord?.uid} />
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
              title={"NID"}
              value={currentRecord?.customFields?.nid}
            />

            <ModalItemStyle
              title={"Home Address:"}
              value={currentRecord?.customFields?.homeAddress}
            />

            <div>
              <p className="text-lg font-medium">CV</p>
              <a
                href={
                  currentRecord?.customFields?.cv
                    ? getImageUrl() + currentRecord?.customFields?.cv
                    : ""
                }
                target="_blank"
              >
                <div className="w-[100px] h-auto p-2 bg-[#B4B8BD] rounded-lg mt-4">
                  <div className="flex items-center size-[80px] justify-center bg-[#B3CEFC] rounded-full">
                    <img src={AllIcons.CV} alt="" />
                  </div>

                  <p className="text-center mt-2 text-black">CV.pdf</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewAdminHRModal;
