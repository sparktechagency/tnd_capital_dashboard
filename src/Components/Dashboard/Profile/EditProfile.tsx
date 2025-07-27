/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Select, Upload } from "antd";
import { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { FadeLoader } from "react-spinners";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { countryCodes } from "../../../pages/Common/settings/ProfileInfo";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/features/profile/profileApi";
import { useAppSelector } from "../../../redux/hooks";
import ReuseButton from "../../../ui/Button/ReuseButton";
import ReusableForm from "../../../ui/Form/ReuseForm";
import ReuseInput from "../../../ui/Form/ReuseInput";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import Topbar from "../../Shared/Topbar";

const EditProfile = () => {
  const serverUrl = getImageUrl();
  const [form] = Form.useForm();
  const [updateProfile] = useUpdateProfileMutation();
  const { data, isFetching } = useGetProfileQuery({});
  const profileData = data?.data;
  const profileImage = serverUrl + profileData?.image;
  const { collapsed } = useAppSelector((state) => state.auth);
  const [imageUrl, setImageUrl] = useState(profileImage);

  const handleImageUpload = (info: any) => {
    if (info.file.status === "removed") {
      setImageUrl(profileImage); // Reset to null or fallback image
    } else {
      const file = info.file.originFileObj || info.file; // Handle the file object safely
      if (file) {
        setImageUrl(URL.createObjectURL(file)); // Set the preview URL of the selected image
      } else {
        console.error("No file selected or file object missing");
      }
    }
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();
    if (values?.image?.file?.originFileObj) {
      formData.append("image", values?.image?.file?.originFileObj);
    }
    const data = {
      name: values?.name,
    };
    formData.append("data", JSON.stringify(data));
    await tryCatchWrapper(
      updateProfile,
      { body: formData },
      "Updating Profile..."
    );
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[88vh]">
        <FadeLoader color="#28314E" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Topbar collapsed={collapsed}></Topbar>
      <div className=" mt-10  rounded-xl">
        <h1 className="text-3xl font-normal text-secondary-color">
          Edit Profile
        </h1>
        <div className=" flex justify-start items-center">
          <ReusableForm
            form={form}
            handleFinish={onFinish}
            className="p-10 w-full lg:w-[70%]"
            defaultValues={profileData}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 rounded-md mt-10">
              {/* Left Side - Image & Role */}
              <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-md w-[350px] h-[350px] border border-[#EBCD6E] pt-10">
                <div className="mt-5 flex flex-col justify-center items-start gap-x-4">
                  <div className=" relative">
                    <img
                      width={1000}
                      height={1000}
                      className="h-40 w-40 relative rounded-full border border-secondary-color object-contain "
                      src={imageUrl}
                      alt=""
                    />
                    <Form.Item name="image">
                      <Upload
                        customRequest={({ onSuccess }) =>
                          setTimeout(() => onSuccess && onSuccess("ok"), 1000)
                        }
                        onChange={handleImageUpload}
                        maxCount={1}
                        accept="image/*"
                        listType="text"
                        showUploadList={{
                          showRemoveIcon: true,
                          showPreviewIcon: false,
                          showDownloadIcon: false,
                          render(file, _, actions) {
                            const truncated =
                              file.name.length > 20
                                ? file.name.slice(0, 17) + "..."
                                : file.name;

                            return (
                              <div className="flex items-center gap-2 mt-2">
                                <span title={file.name}>{truncated}</span>
                                <button
                                  type="button"
                                  onClick={actions.remove}
                                  className="text-red-500 text-sm underline"
                                >
                                  Remove
                                </button>
                              </div>
                            );
                          },
                        }}
                      >
                        <button
                          type="button"
                          style={{
                            zIndex: 1,
                          }}
                          className="bg-base-color/18 p-2 w-fit h-fit !border-none absolute -top-12 left-[115px] rounded-full cursor-pointer shadow-lg"
                        >
                          <IoCameraOutline className="w-6 h-6 text-secondary-color" />
                        </button>
                      </Upload>
                    </Form.Item>
                  </div>
                </div>
              </div>

              {/* Right Side - Info */}
              <div className="flex-1 space-y-4">
                <ReuseInput
                  label="Name"
                  value="Enrique"
                  placeholder="John Doe"
                  name="name"
                  labelClassName="!font-normal !text-xl"
                  inputClassName="!bg-[#F5F5F5] !text-[#535763] !border-none h-11"
                />
                <ReuseInput
                  label="Email"
                  value="Enrique"
                  placeholder="john.doe@example.com"
                  name="email"
                  labelClassName="!font-normal !text-xl"
                  inputClassName="!bg-[#F5F5F5] !text-[#535763] !border-none h-11"
                />
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <div>
                      <label
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        Phone Number
                      </label>
                      <div className="flex gap-2 mt-2">
                        <Select
                          defaultValue={"+1"}
                          className="!h-11 !bg-[#F5F5F5]"
                          style={{ width: 150 }}
                        >
                          {countryCodes.map((country) => (
                            <Select.Option
                              key={country.value}
                              value={country.value}
                            >
                              <div className="!flex items-center">
                                <img
                                  src={country.flag || countryCodes[0].flag}
                                  alt={`${country.value} Flag`}
                                  className="w-7 h-5 "
                                />
                                {country.label || "+1"}
                              </div>
                            </Select.Option>
                          ))}
                        </Select>
                        <div className="flex-1">
                          <ReuseInput
                            value="Enrique"
                            placeholder="john.doe@example.com"
                            name="email"
                            labelClassName="!font-normal !text-xl"
                            inputClassName="!bg-[#F5F5F5] !text-[#535763] !border-none h-11"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ReuseButton
              htmlType="submit"
              variant="secondary"
              className="full mt-4"
            >
              Save Changes
            </ReuseButton>

            <div className=" text-white mt-5"></div>
          </ReusableForm>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;
