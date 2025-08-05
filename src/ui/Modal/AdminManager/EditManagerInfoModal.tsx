import { Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseButton from "../../Button/ReuseButton";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface AddSpokeProps<T> {
  isEditManagerOpen: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
}

const EditManagerInfoModal: React.FC<AddSpokeProps<any>> = ({
  isEditManagerOpen,
  handleCancel,
  currentRecord,
}) => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  console.log(currentRecord);
  return (
    <Modal
      // title="Confirm Delete"
      open={isEditManagerOpen}
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
          label="Location ID"
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

export default EditManagerInfoModal;
