import { Form, Upload } from "antd";
import Topbar from "../../Components/Shared/Topbar";
import { useAppSelector } from "../../redux/hooks";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import { AllIcons } from "../../../public/images/AllImages";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReuseSelect from "../../ui/Form/ReuseSelect";
import { useState } from "react";
import { getInput } from "./utils";
import { useCreateLoanApplicationMutation } from "../../redux/features/fieldOfficer/fieldOfficerLoanApplicationApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useNavigate } from "react-router-dom";

const FieldOfficerLoanApply = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  // Add state to handle Applicant Status
  const [applicantStatus, setApplicantStatus] = useState<string>("From Leads");
  const navigation = useNavigate();

  const inputStructure = getInput(applicantStatus);

  // api calling
  const [createLoanApplication] = useCreateLoanApplicationMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const startDate = new Date(values.startDate);
    const endDate = new Date(values.endDate);

    const formattedData = {
      ...values,
      applicantStatus,
      monthlyIncome: Number(values.monthlyIncome),
      loanAmountRequested: Number(values.loanAmountRequested),
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    const formData = new FormData();

    if (values.image?.file?.originFileObj) {
      formData.append("image", values?.image?.file?.originFileObj);
    }

    formData.append("data", JSON.stringify(formattedData));

    console.log(formattedData, "formattedData");
    const res = await tryCatchWrapper(
      createLoanApplication,
      { body: formData },
      "Creating Loan Application..."
    );

    if (res?.statusCode === 201) {
      form.resetFields();
      navigation(-1);
    }
  };

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}></Topbar>
      <div className="mt-10">
        <p className="text-xl font-medium">Lone Apply</p>

        <div>
          <ReusableForm
            form={form}
            handleFinish={onFinish}
            className="!px-32 !mt-10"
          >
            <div className="grid grid-cols-2 gap-x-52">
              <ReuseSelect
                options={[
                  {
                    label: "From Leads",
                    value: "From Leads",
                  },
                  {
                    label: "New",
                    value: "New",
                  },
                ]}
                placeholder="Applicant Status"
                name="applicantStatus"
                defaultValue={applicantStatus}
                label="Applicant Status"
                onChange={(value) => setApplicantStatus(value)}
              />

              {inputStructure.map((input, index) => (
                <>
                  {input.isSelect ? (
                    <>
                      <ReuseSelect
                        name={input?.name}
                        label={input.label}
                        Typolevel={4}
                        labelClassName="!text-sm"
                        options={input.options}
                      />
                    </>
                  ) : (
                    <>
                      <ReuseInput
                        key={index}
                        name={input?.name}
                        label={input.label}
                        Typolevel={4}
                        inputType={input.inputType}
                        placeholder={input.placeholder}
                        labelClassName={input.labelClassName}
                        rules={input.rules}
                        inputClassName="!bg-[#F2F2F2] !border-none !rounded-lg !h-12 !text-sm placeholder:!text-[#B4BCC9] !placeholder:text-xs"
                      />
                    </>
                  )}
                </>
              ))}

              {applicantStatus === "New" && (
                <div>
                  <label htmlFor="image" className="block text-sm mb-3">
                    Upload Picture
                  </label>
                  <Form.Item name="image" className="mb-8 w-full">
                    <Upload
                      maxCount={1}
                      listType="text"
                      accept="image/*"
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
                        <p className="text-black font-medium">Upload</p>
                      </div>
                    </Upload>
                  </Form.Item>
                </div>
              )}
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
                htmlType="submit"
                className="!py-6 !px-9 !font-bold rounded-lg !w-full"
              >
                Submit Application
              </ReuseButton>
            </div>
          </ReusableForm>
        </div>
      </div>
    </div>
  );
};

export default FieldOfficerLoanApply;
