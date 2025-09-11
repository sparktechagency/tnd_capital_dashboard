/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal, Upload } from "antd";
import { useEffect } from "react";
import { AllIcons } from "../../../../public/images/AllImages";
import { useGetAllRepaymentsFieldQuery } from "../../../redux/features/admin/adminRepayments/adminRepaymentsApi";
import { useUpdateFieldOfficerLeadsMutation } from "../../../redux/features/fieldOfficer/fieldOfficerLeadsApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import ReuseButton from "../../Button/ReuseButton";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import Loading from "../../Loading";
import ReuseSelect from "../../Form/ReuseSelect";

const EditRepaymentsModal = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}: {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}) => {
  const [form] = Form.useForm();

  const { data: repaymentsField, isLoading } = useGetAllRepaymentsFieldQuery(
    {}
  );
  const [updateFieldOfficerLeads] = useUpdateFieldOfficerLeadsMutation();

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        clientUid: currentRecord?.client?.uid,
        loanUid: currentRecord?.loan?.uid,
        month: currentRecord?.month,
      });
    }
  }, [currentRecord, form]);

  const onFinish = async (values: any) => {
    console.log("HR information:", values);

    const formettedData = {
      clientUid: values?.clientUid,
      loanUid: values?.loanUid,
      month: values?.month,
    };

    const res = await tryCatchWrapper(
    //   updateFieldOfficerLeads,
      { body: formettedData, params: currentRecord?._id },
      "Updating Field Officer ..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };

  if (isLoading) return <Loading />;

  return (
    <Modal
      open={isEditModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={800}
    >
      <div className="mt-10 ">
        <p className="text-xl font-medium ">Edit Leads </p>

        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="!px-4 !mt-10"
        >
          <div className="grid grid-cols-2 gap-x-10">
            {repaymentsField?.data?.map((field: any, index: number) => {
              if (field.inputName === "month") {
                return null;
              }

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

            <ReuseSelect
              name="month"
              label="Month"
              Typolevel={4}
              labelClassName="!font-normal !text-sm"
              options={[
                { value: "January", label: "January" },
                { value: "February", label: "February" },
                { value: "March", label: "March" },
                { value: "April", label: "April" },
                { value: "May", label: "May" },
                { value: "June", label: "June" },
                { value: "July", label: "July" },
                { value: "August", label: "August" },
                { value: "September", label: "September" },
                { value: "October", label: "October" },
                { value: "November", label: "November" },
                { value: "December", label: "December" },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-20 px-28 mt-20">
            <ReuseButton
              onClick={handleCancel}
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
    </Modal>
  );
};

export default EditRepaymentsModal;
