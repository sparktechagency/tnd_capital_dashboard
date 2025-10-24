/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, Upload } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AllIcons } from "../../../../public/images/AllImages";
import { getInput } from "../../../pages/FieldOfficer/utils";
import { useUpdateLoanApplicationMutation } from "../../../redux/features/fieldOfficer/fieldOfficerLoanApplicationApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseSelect from "../../Form/ReuseSelect";

const EditLoanApplication = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}: {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}) => {
  //   const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  // Add state to handle Applicant Status
  const [applicantStatus, setApplicantStatus] = useState<string>("From Leads");

  const inputStructure = getInput(applicantStatus);

  // api calling
  const [updateLoanApplication] = useUpdateLoanApplicationMutation();

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        applicantStatus: currentRecord?.applicantStatus,
        name: currentRecord?.clientId?.customFields?.name,
        email: currentRecord?.clientId?.email,
        phoneNumber: currentRecord?.clientId?.email,
        homeAddress: currentRecord?.clientId?.customFields?.homeAddress,
        nid: currentRecord?.clientId?.customFields?.nid,
        leadUid: currentRecord?.clientId?.uid,
        monthlyIncome: currentRecord?.monthlyIncome,
        loanAmountRequested: currentRecord?.loanAmountRequested,
        typeofFinancingRequested: currentRecord?.typeofFinancingRequested,
        employmentStatus: currentRecord?.employmentStatus,
        preferredContact: currentRecord?.preferredContact,
        whereAreYouLocated: currentRecord?.whereAreYouLocated,
        term: currentRecord?.term,
        purposeOfFinancing: currentRecord?.purposeOfFinancing,
        image: currentRecord?.clientId?.customFields?.image,
        // startDate,
        // endDate,
      });
      setApplicantStatus(currentRecord.applicantStatus);
    }
  }, [currentRecord, form]);

  // Handle form value changes to auto-fill endDate
  const handleValuesChange = (changedValues: any, allValues: any) => {
    // Check if startDate or term changed
    if (changedValues.startDate || changedValues.term) {
      const { startDate, term } = allValues;
      if (startDate && term) {
        // Extract the number of months from term (e.g., "6 Months" -> 6)
        const months = parseInt(term.split(" ")[0]);
        if (!isNaN(months)) {
          // Calculate end date
          const endDate = dayjs(startDate).add(months, "month");
          form.setFieldsValue({ endDate: endDate });
        }
      }
    }
  };

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

    const res = await tryCatchWrapper(
      updateLoanApplication,
      { body: formData, params: currentRecord?._id },
      "Updating Loan Application..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

  return (
    <Modal
      open={isEditModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={1000}
    >
      <div className="mt-10 ">
        <p className="text-xl font-medium ">Edit Loan Application </p>

        <div>
          <ReusableForm
            form={form}
            handleFinish={onFinish}
            onValuesChange={handleValuesChange}
            className="!px-8 !mt-10"
          >
            <div className="grid grid-cols-2 gap-x-6">
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
                        rules={input.rules as any}
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
                onClick={handleCancel}
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
    </Modal>
  );
};

export default EditLoanApplication;
