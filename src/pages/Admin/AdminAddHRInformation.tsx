/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AllIcons } from "../../../public/images/AllImages";
import Topbar from "../../Components/Shared/Topbar";
import { EditIcon, PlusIcon } from "../../Components/svg/leads";
import {
  useCreateUserMutation,
  useGetAllUsersRelatedFieldQuery,
} from "../../redux/features/admin/adminUsers/adminUsers";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import Loading from "../../ui/Loading";
import AdminHRFeaturesModal from "../../ui/Modal/AdminHR/AdminHRFeaturesModal";
import { applyValidationToFields } from "../../utils/fieldValidation";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const AdminAddHrInformation = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [isAddFeaturesModalOpen, setIsAddFeaturesModalOpen] =
    useState<boolean>(false);

  const { pathname } = useLocation();
  const currentPath = pathname.split("/")[2];

  const navigation = useNavigate();

  // api calling

  const { data: userField, isLoading } = useGetAllUsersRelatedFieldQuery({});
  const [createUser] = useCreateUserMutation();

  const onFinish = async (values: any) => {
    console.log("HR information:", values);

    const formData = new FormData();
    if (values?.image?.file?.originFileObj) {
      formData.append("image", values?.image?.file?.originFileObj);
    }
    if (values?.cv?.file?.originFileObj) {
      formData.append("cv", values?.cv?.file?.originFileObj);
    }
    const data = {
      name: values?.name,
      email: values?.email,
      phoneNumber: values?.phoneNumber,
      homeAddress: values?.homeAddress,
      nid: values?.nid,
      role: "hr",
    };
    formData.append("data", JSON.stringify(data));

    const res = await tryCatchWrapper(
      createUser,
      { body: formData },
      "Creating HR ..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      navigation(-1);
    }
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
        <div className="flex items-center  gap-x-10 py-5">
          <ReuseButton
            children=" Edit Features"
            icon={EditIcon()}
            className="!border-[#D1D1D1] !rounded-lg !font-semibold !w-full !h-12"
            url="/admin/hr/edit-hr-information"
          />
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

      <div className="mt-16 ">
        <p className="text-xl font-medium ">HR Information </p>

        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="px:!px-32 !mt-10"
        >
          <div className="grid grid-cols-2 lg:gap-x-52 gap-x-10">
            {applyValidationToFields(userField?.data || []).map(
              (field: any, index: number) => {
                // Check if the field is 'hubUid' and the current path is 'hr'
                if (field.inputName === "hubUid" && currentPath === "hr") {
                  return null; // Skip rendering the 'hubUid' field
                }

                return (
                  <>
                    {field?.inputType === "file" ? (
                      <div className="flex flex-col">
                        <label
                          htmlFor={field.inputName}
                          className="block text-sm font-medium mb-3"
                        >
                          {field.label}
                        </label>
                        <Form.Item
                          name={field.inputName}
                          className="mb-8 w-full"
                          key={index}
                        >
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
                            <div className="md:w-[320px] p-4 border border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center bg-transparent hover:border-primary transition-all duration-300 cursor-pointer">
                              <p className="text-3xl mb-2">
                                <img src={AllIcons.upload} alt="" />
                              </p>
                              <p className="text-black font-medium">
                                {field.placeholder}
                              </p>
                            </div>
                          </Upload>
                        </Form.Item>
                      </div>
                    ) : (
                      <ReuseInput
                        key={index}
                        name={field.inputName}
                        label={field.label}
                        Typolevel={4}
                        inputType={field.inputType}
                        type={field.type}
                        placeholder={field.placeholder}
                        labelClassName="!font-normal !text-sm"
                        rules={field.rules}
                        onKeyPress={field.onKeyPress}
                        inputClassName="!bg-[#F2F2F2] !border-none !rounded-xl !h-[52px] placeholder:!text-[#B4BCC9] placeholder:text-xs"
                      />
                    )}
                  </>
                );
              }
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-20 px-28 mt-20">
            <ReuseButton
              onClick={() => navigation(-1)}
              variant="outline"
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
            >
              Cancel
            </ReuseButton>
            <ReuseButton
              variant="secondary"
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
              htmlType="submit"
            >
              Submit
            </ReuseButton>
          </div>
        </ReusableForm>
      </div>
    </div>
  );
};

export default AdminAddHrInformation;
