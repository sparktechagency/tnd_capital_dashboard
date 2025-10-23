/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AllIcons } from "../../../public/images/AllImages";
import Topbar from "../../Components/Shared/Topbar";
import {
  useCreateUserMutation,
  useGetAllUsersRelatedFieldQuery,
} from "../../redux/features/admin/adminUsers/adminUsers";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseSelect from "../../ui/Form/ReuseSelect";
import Loading from "../../ui/Loading";
import { applyValidationToFields } from "../../utils/fieldValidation";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const HRAddManager = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  const [role, setRole] = useState<string>("hubManager"); // [selectRole ]

  const { pathname } = useLocation();
  const currentPath = pathname.split("/")[2];

  const navigation = useNavigate();
  // api calling

  const [createUser] = useCreateUserMutation();
  const { data: userField, isLoading } = useGetAllUsersRelatedFieldQuery({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      hubUid: values?.hubUid,
      role: role,
    };
    formData.append("data", JSON.stringify(data));

    const res = await tryCatchWrapper(
      createUser,
      { body: formData },
      "Creating Manager ..."
    );

    if (res?.statusCode === 201) {
      form.resetFields();
      navigation(-1);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}></Topbar>

      <div className="mt-10 ">
        <p className="text-xl font-medium ">Add Manager </p>

        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="lg:!px-32 !mt-10"
        >
          <div className="w-[480px] mx-auto">
            <ReuseSelect
              name="role"
              defaultValue={role}
              label="Add Manager Type"
              onChange={(value) => setRole(value)}
              options={[
                { value: "hubManager", label: "General Manager" },
                { value: "spokeManager", label: "Branch Manager" },
              ]}
            />

            {role === "spokeManager" && (
              <ReuseInput
                name="hubUid"
                label="Hub ID"
                Typolevel={4}
                inputType="text"
                placeholder="Enter Hub ID"
                labelClassName="!font-normal !text-sm"
                rules={[
                  {
                    required: true,
                    message: "Current password is required",
                  },
                ]}
                inputClassName="!bg-[#F2F2F2] !border-none !rounded-xl !h-[52px] placeholder:!text-[#B4BCC9] placeholder:text-xs"
              />
            )}
          </div>
          <div className="grid grid-cols-2 lg:gap-x-52 gap-x-10">
            {applyValidationToFields(userField?.data || []).map(
              (field: any, index: number) => {
                // Check if the field is 'hubUid' and the current path is 'hr'
                if (
                  field.inputName === "hubUid" &&
                  currentPath === "managers"
                ) {
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
              Submit
            </ReuseButton>
          </div>
        </ReusableForm>
      </div>
    </div>
  );
};

export default HRAddManager;
