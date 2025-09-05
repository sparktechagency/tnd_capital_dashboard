/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload } from "antd";
import { useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import Topbar from "../../Components/Shared/Topbar";
import { PlusIcon } from "../../Components/svg/leads";
import { useGetAllUsersRelatedFieldQuery } from "../../redux/features/admin/adminUsers/adminUsers";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import Loading from "../../ui/Loading";
import AdminHRFeaturesModal from "../../ui/Modal/AdminHR/AdminHRFeaturesModal";

const AdminOfficerInformation = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [isAddFeaturesModalOpen, setIsAddFeaturesModalOpen] =
    useState<boolean>(false);

  // api calling

  const { data: userField, isLoading } = useGetAllUsersRelatedFieldQuery({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log(values);
  };

  const handleCancel = () => {
    setIsAddFeaturesModalOpen(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}>
        <div className="lg:ml-[1000px]">
          <ReuseButton
            children="Add Features"
            onClick={() => setIsAddFeaturesModalOpen(true)}
            icon={PlusIcon()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
          />
        </div>
        <AdminHRFeaturesModal
          isAddFeaturesModalOpen={isAddFeaturesModalOpen}
          handleCancel={handleCancel}
        />
      </Topbar>

      <div className="mt-10 ">
        <p className="text-xl font-medium ">Officer Information </p>

        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="!px-32 !mt-10"
        >
          <div className="grid grid-cols-2 gap-x-52">
            {userField?.data?.map((field: any, index: number) => {
              return (
                <>
                  {field?.inputType === "file" ? (
                    <Form.Item
                      name={field.inputName}
                      className="mb-8 w-full"
                      key={index}
                    >
                      <label
                        htmlFor={field.inputName}
                        className="block text-sm font-medium mb-3"
                      >
                        {field.label}
                      </label>
                      <Upload
                        maxCount={1}
                        listType="text"
                        accept="file/*"
                        multiple={false}
                        customRequest={(options) => {
                          setTimeout(() => {
                            options.onSuccess?.("ok");
                          }, 1000);
                        }}
                        className=""
                      >
                        <div className="lg:w-[320px] p-4 border border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center bg-transparent hover:border-primary transition-all duration-300 cursor-pointer">
                          <p className="text-3xl mb-2">
                            <img src={AllIcons.upload} alt="" />
                          </p>
                          <p className="text-black font-medium">
                            {field.placeholder}
                          </p>
                        </div>
                      </Upload>
                    </Form.Item>
                  ) : (
                    <ReuseInput
                      key={index}
                      name={field.inputName}
                      label={field.label}
                      Typolevel={4}
                      inputType={field.inputType}
                      placeholder={field.placeholder}
                      labelClassName="!font-normal !text-sm"
                      rules={field.rules}
                      inputClassName="!bg-[#F2F2F2] !border-none !rounded-xl !h-[52px] placeholder:!text-[#B4BCC9] placeholder:text-xs"
                    />
                  )}
                </>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-x-20 px-28 mt-20">
            <ReuseButton
              variant="outline"
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
            >
              Cancel
            </ReuseButton>
            <ReuseButton
              variant="secondary"
              url="/admin/field-officers/edit-officer-information"
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
            >
              Edit Features
            </ReuseButton>
          </div>
        </ReusableForm>
      </div>
    </div>
  );
};

export default AdminOfficerInformation;
