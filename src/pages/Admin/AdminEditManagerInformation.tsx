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

const inputStructure = [
  {
    name: "Full Name",
    inputData: [
      {
        name: "name",
        inputType: "text",
        placeholder: "Input Name",
        label: "Input Name",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Name is required" }],
      },
      {
        name: "phoneNumber",
        inputType: "text",
        label: "Input Type",
        placeholder: "Input Type",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Name is required" }],
      },
      {
        name: "email",
        inputType: "text",
        label: "Placeholder Text",
        placeholder: "Placeholder Text",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Email is required" }],
      },
    ],
  },
  {
    name: "Phone Number",
    inputData: [
      {
        name: "name",
        inputType: "text",
        placeholder: "Input Name",
        label: "Input Name",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Name is required" }],
      },
      {
        name: "phoneNumber",
        inputType: "text",
        label: "Input Type",
        placeholder: "Input Type",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Name is required" }],
      },
      {
        name: "email",
        inputType: "text",
        label: "Placeholder Text",
        placeholder: "Placeholder Text",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Email is required" }],
      },
    ],
  },
  {
    name: "Email",
    inputData: [
      {
        name: "name",
        inputType: "text",
        placeholder: "Input Name",
        label: "Input Name",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Name is required" }],
      },
      {
        name: "phoneNumber",
        inputType: "text",
        label: "Input Type",
        placeholder: "Input Type",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Name is required" }],
      },
      {
        name: "email",
        inputType: "text",
        label: "Placeholder Text",
        placeholder: "Placeholder Text",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Email is required" }],
      },
    ],
  },
  {
    name: "House Address",
    inputData: [
      {
        name: "name",
        inputType: "text",
        placeholder: "Input Name",
        label: "Input Name",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Name is required" }],
      },
      {
        name: "phoneNumber",
        inputType: "text",
        label: "Input Type",
        placeholder: "Input Type",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Name is required" }],
      },
      {
        name: "email",
        inputType: "text",
        label: "Placeholder Text",
        placeholder: "Placeholder Text",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Email is required" }],
      },
    ],
  },
  {
    name: "Upload Picture",
    inputData: [
      {
        name: "name",
        inputType: "text",
        placeholder: "Input Name",
        label: "Input Name",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Name is required" }],
      },
      {
        name: "phoneNumber",
        inputType: "text",
        label: "Input Type",
        placeholder: "Input Type",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Name is required" }],
      },
      {
        name: "email",
        inputType: "text",
        label: "Placeholder Text",
        placeholder: "Placeholder Text",
        labelClassName: "!font-normal !text-sm",
        rules: [{ required: true, message: "Email is required" }],
      },
    ],
  },
];

const AdminEditManagerInformation = () => {
  const [form] = Form.useForm();
  const { collapsed } = useAppSelector((state) => state.auth);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDelete = async () => {
    const res = await tryCatchWrapper(
      // deleteAdmin,
      { params: currentRecord?._id },
      "Deleting..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
  };

  const onFinish = (values: any) => {
    console.log("Received values of update form:", values);
  };
  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}></Topbar>

      <div className="mt-10 ">
        <p className="text-xl font-medium ">Lead Information </p>
        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="!px-32 !mt-10"
        >
          <div className="grid grid-cols-2 gap-x-10 gap-y-5">
            {inputStructure.map((input, index) => (
              <div key={index} className="bg-[#F2F2F2] p-6 rounded-lg">
                <div className="flex items-center gap-x-2">
                  <img src={down} alt="" className="cursor-pointer" />
                  <p className="text-lg font-medium">{input.name}</p>
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
                  {input.inputData.map((inputData, index) => (
                    <ReuseInput
                      key={index}
                      name={inputData.name}
                      label={inputData.label}
                      Typolevel={4}
                      placeholder={inputData.placeholder}
                      labelClassName={inputData.labelClassName}
                      rules={inputData.rules}
                      inputClassName="!text-sm !border-none"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-20 px-28 mt-20">
            <ReuseButton
              variant="outline"
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
              // icon={allIcons.arrowRight}
            >
              Cancel
            </ReuseButton>
            <ReuseButton
              variant="secondary"
              url="/admin/edit-lead-information"
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
              // icon={allIcons.arrowRight}
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

export default AdminEditManagerInformation;
