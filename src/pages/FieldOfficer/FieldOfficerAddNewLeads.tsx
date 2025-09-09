/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import Topbar from "../../Components/Shared/Topbar";
import {
  useAddLeadsMutation,
  useGetAllLeadsFieldQuery,
} from "../../redux/features/fieldOfficer/fieldOfficerLeadsApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { AllIcons } from "../../../public/images/AllImages";
import Loading from "../../ui/Loading";

const FieldOfficerAddNewLeads = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  const { data: leadsField, isLoading } = useGetAllLeadsFieldQuery({});

  const [addLeads] = useAddLeadsMutation();
  const navigation = useNavigate();

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
      addLeads,
      { body: formData },
      "Creating Leads ..."
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
        <p className="text-xl font-medium ">Lead Apply </p>

        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="!px-32 !mt-10"
        >
          <div className="grid grid-cols-2 gap-x-6">
            {leadsField?.data?.map((field: any, index: number) => {
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
                    </div>
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
              onClick={() => navigation(-1)}
              variant="outline"
              className="!py-6 !px-9 !font-bold rounded-lg !w-full"
            >
              Cancel
            </ReuseButton>
            <ReuseButton
              htmlType="submit"
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

export default FieldOfficerAddNewLeads;
