/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload } from "antd";
import { useState } from "react";
import { AllIcons } from "../../../public/images/AllImages";
import Topbar from "../../Components/Shared/Topbar";
import { EditIcon, PlusIcon } from "../../Components/svg/leads";
import { useGetAllRepaymentsFieldQuery } from "../../redux/features/admin/adminRepayments/adminRepaymentsApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import AdminRepaymentsFeaturesModal from "../../ui/Modal/AdminRepayments/AdminRepaymentsFeaturesModal";
import { useNavigate } from "react-router-dom";

const AdminAddRepayments = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [isAddFeaturesModalOpen, setIsAddFeaturesModalOpen] =
    useState<boolean>(false);

  const navigation = useNavigate();

  const { data: repaymentsField } = useGetAllRepaymentsFieldQuery({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log(values);
  };

  const handleCancel = () => {
    setIsAddFeaturesModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}>
        <div className="flex items-center  gap-x-10 py-5">
          <ReuseButton
            children=" Edit Features"
            icon={EditIcon()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
            url="/admin/repayments/edit-repayments-information"
          />
          <ReuseButton
            children="Add Features"
            onClick={() => setIsAddFeaturesModalOpen(true)}
            icon={PlusIcon()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
          />
        </div>
        <AdminRepaymentsFeaturesModal
          isAddFeaturesModalOpen={isAddFeaturesModalOpen}
          handleCancel={handleCancel}
        />
      </Topbar>

      <div className="mt-16 ">
        <p className="text-xl font-medium ">Payment Information </p>

        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="!px-32 !mt-10"
        >
          <div className="grid grid-cols-2 gap-x-52">
            {repaymentsField?.data?.map((field: any, index: number) => {
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
              onClick={() => navigation(-1)}
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
            >
              Cancel
            </ReuseButton>
            <ReuseButton
              variant="secondary"
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
            >
              Submit
            </ReuseButton>
          </div>
        </ReusableForm>
      </div>
    </div>
  );
};

export default AdminAddRepayments;
