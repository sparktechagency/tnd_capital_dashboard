/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import { AllIcons } from "../../../public/images/AllImages";
import Topbar from "../../Components/Shared/Topbar";
import { useGetAllRepaymentsFieldQuery } from "../../redux/features/admin/adminRepayments/adminRepaymentsApi";
import { useCreateRepayementMutation } from "../../redux/features/fieldOfficer/fieldOfficerRepaymentApi";
import { useAppSelector } from "../../redux/hooks";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseSelect from "../../ui/Form/ReuseSelect";
import Loading from "../../ui/Loading";
import tryCatchWrapper from "../../utils/tryCatchWrapper";

const FieldOfficerMonthlyRepayments = () => {
  const { collapsed } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();

  const navigation = useNavigate();
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const { data: repaymentsField, isLoading } = useGetAllRepaymentsFieldQuery(
    {}
  );

  const [createRepayement] = useCreateRepayementMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = async (values: any) => {
    const formattedData = {
      ...values,
      month: currentMonth,
      installmentAmount: Number(values.installmentAmount),
    };

    const res = await tryCatchWrapper(
      createRepayement,
      { body: formattedData },
      "Creating..."
    );

    if (res?.statusCode === 201) {
      form.resetFields();
      navigation(-1);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}></Topbar>

      <div className="mt-10 ">
        <p className="text-xl font-medium ">Monthly Payments </p>

        <ReusableForm
          form={form}
          handleFinish={onFinish}
          className="!px-32 !mt-10"
        >
          <div className="grid grid-cols-2 gap-x-52">
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
              defaultValue={currentMonth}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-20 lg:px-40 mt-20">
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

export default FieldOfficerMonthlyRepayments;
