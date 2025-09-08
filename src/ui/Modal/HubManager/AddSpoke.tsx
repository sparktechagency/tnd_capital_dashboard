/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";
import { useAssignSpokeToFieldOfficerMutation } from "../../../redux/features/HubManager/hubManagerFieldOfficerApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface AddSpokeProps<T> {
  isAddSpokeVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
}

const AddSpoke: React.FC<AddSpokeProps<any>> = ({
  isAddSpokeVisible,
  handleCancel,
  currentRecord,
}) => {
  const [assignSpokeToFieldOfficer] = useAssignSpokeToFieldOfficerMutation();

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      assignSpokeToFieldOfficer,
      {
        body: {
          fieldOfficerId: currentRecord?._id,
          spokeUid: values.spoke,
        },
      },
      "Adding Spoke..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  return (
    <Modal
      // title="Confirm Delete"
      open={isAddSpokeVisible}
      onCancel={handleCancel}
      okText="Remove"
      cancelText="Cancel"
      centered
      footer={false}
    >
      <ReusableForm handleFinish={onFinish} className="!p-10 ">
        <ReuseInput
          name="spoke"
          Typolevel={5}
          inputType="text"
          type="text"
          label="Spoke ID"
          placeholder="Type"
          labelClassName="!text-xs"
          rules={[{ required: true, message: "Current password is required" }]}
        />
        <ReuseButton
          htmlType="submit"
          variant="secondary"
          className="w-full mt-4"
        >
          Add
        </ReuseButton>
      </ReusableForm>
    </Modal>
  );
};

export default AddSpoke;
