import { Modal } from "antd";
import ModalItemStyle from "../../../utils/ModalItemStyle";
import { AllIcons } from "../../../../public/images/AllImages";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ViewHRManager = ({
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
            Manager Details
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
            <ModalItemStyle title="#FO.ID" value={currentRecord?.foId} />
            <ModalItemStyle title="Name" value={currentRecord?.fullName} />
            <ModalItemStyle title={"Email"} value={currentRecord?.email} />
            <ModalItemStyle
              title={"Phone Number"}
              value={currentRecord?.phoneNumber}
            />
            <ModalItemStyle title={"NID"} value={currentRecord?.nid} />
            <ModalItemStyle title={"Hub ID"} value={currentRecord?.hubId} />
            <ModalItemStyle
              title={"Home Address:"}
              value={currentRecord?.address}
            />
            <ModalItemStyle
              title={"Set Location:"}
              value={currentRecord?.setLocation}
            />

            <div>
              <p className="text-lg font-medium">CV</p>
              <div className="w-[100px] h-auto p-2 bg-[#B4B8BD] rounded-lg mt-4">
                <div className="flex items-center size-[80px] justify-center bg-[#B3CEFC] rounded-full">
                  <img src={AllIcons.CV} alt="" />
                </div>
                <p className="text-center mt-2">CV.pdf</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewHRManager;
