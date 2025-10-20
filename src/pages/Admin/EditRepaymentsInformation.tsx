/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import deleteIcon from "../../../public/images/icons/delete.svg";
import down from "../../../public/images/icons/down.svg";
import { useState } from "react";
import DeleteModal from "../../ui/Modal/DeleteModal";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import {
  useDeleteRepaymentsFieldMutation,
  useGetAllRepaymentsFieldQuery,
  useUpdateRepaymentsFieldMutation,
} from "../../redux/features/admin/adminRepayments/adminRepaymentsApi";
import { groupedDataFunction } from "../../utils/groupedData";
import Loading from "../../ui/Loading";
import { useNavigate } from "react-router-dom";

const EditRepaymentsInformation = () => {
  const [form] = Form.useForm();
  const { collapsed } = useAppSelector((state) => state.auth);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const navigation = useNavigate();
  // api calling
  const { data: getAllRepaymentsField, isFetching } =
    useGetAllRepaymentsFieldQuery({});
  const [updateRepaymentsField] = useUpdateRepaymentsFieldMutation();
  const [deleteRepaymentsField] = useDeleteRepaymentsFieldMutation();

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    const res = await tryCatchWrapper(
      deleteRepaymentsField,
      { params: currentRecord?._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

  const onFinish = async (values: any) => {
    const groupedData = groupedDataFunction(values);

    const res = await tryCatchWrapper(
      updateRepaymentsField,
      { body: groupedData },
      "Updating..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}></Topbar>

      <div className="mt-10 ">
        <p className="text-xl font-medium ">Edit Payment Information </p>
        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="lg:!px-32 !mt-10"
        >
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            {getAllRepaymentsField?.data?.map((input: any, index: number) => {
              return (
                <div key={index} className="bg-[#F2F2F2] p-6 rounded-lg">
                  <div className="flex items-center gap-x-2">
                    <img src={down} alt="" className="cursor-pointer" />
                    <p className="text-lg font-medium">{input.label}</p>
                    <img
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setCurrentRecord(input);
                      }}
                      src={deleteIcon}
                      alt=""
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="px-6 mt-3">
                    <ReuseInput
                      name={input._id + "-" + "label"}
                      label="Input Label"
                      Typolevel={4}
                      placeholder="Input Label"
                      labelClassName="!font-normal !text-sm"
                      inputClassName="!text-sm !border-none"
                    />
                    <ReuseInput
                      name={input._id + "-" + "inputName"}
                      label="Input Name"
                      Typolevel={4}
                      placeholder="Input Name"
                      labelClassName="!font-normal !text-sm"
                      inputClassName="!text-sm !border-none"
                    />
                    <ReuseInput
                      name={input._id + "-" + "inputType"}
                      label="Input Type"
                      Typolevel={4}
                      placeholder="Input Type"
                      labelClassName="!font-normal !text-sm"
                      inputClassName="!text-sm !border-none"
                    />
                    <ReuseInput
                      name={input._id + "-" + "placeholder"}
                      label="Placeholder"
                      Typolevel={4}
                      placeholder="Input Placeholder"
                      labelClassName="!font-normal !text-sm"
                      inputClassName="!text-sm !border-none"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-x-20 lg:px-28 mt-20">
            <ReuseButton
              variant="outline"
              onClick={() => navigation(-1)}
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
            >
              Cancel
            </ReuseButton>
            <ReuseButton
              variant="secondary"
              htmlType="submit"
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
            >
              Edit Features
            </ReuseButton>
          </div>
        </ReusableForm>
      </div>

      {/* Modal */}
      <DeleteModal
        currentRecord={currentRecord}
        handleCancel={handleCancel}
        isDeleteModalVisible={isDeleteModalOpen}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default EditRepaymentsInformation;
