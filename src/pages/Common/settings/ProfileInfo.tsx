import { Select, Typography } from "antd";
import ReuseInput from "../../../ui/Form/ReuseInput";
import { useGetProfileQuery } from "../../../redux/features/auth/authApi";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { AllImages } from "../../../../public/images/AllImages";
import Loading from "../../../ui/Loading";

const { Title, Text } = Typography;

export const countryCodes = [
  { label: "+1", value: "US", flag: "https://flagcdn.com/w320/us.png" },
  { label: "+44", value: "UK", flag: "https://flagcdn.com/w320/gb.png" },
  { label: "+91", value: "IN", flag: "https://flagcdn.com/w320/in.png" },
  { label: "+880", value: "BD", flag: "https://flagcdn.com/w320/bd.png" }, // Bangladesh
  { label: "+92", value: "PK", flag: "https://flagcdn.com/w320/pk.png" }, // Pakistan
  { label: "+54", value: "AR", flag: "https://flagcdn.com/w320/ar.png" }, // Argentina
  { label: "+90", value: "TR", flag: "https://flagcdn.com/w320/tr.png" }, // Turkey
];

const ProfileInfo = () => {
  const { data, isLoading } = useGetProfileQuery({});

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 rounded-md mt-10">
      {/* Left Side - Image & Role */}
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-md w-[350px] h-[350px] border border-[#EBCD6E] pt-10">
        <img
          src={
            data?.data?.customFields?.image
              ? getImageUrl() + data?.data?.customFields?.image
              : AllImages.profile
          }
          alt="Profile"
          className="size-44 rounded-full object-cover mb-4"
        />
        <Text className="text-gray-500 !text-lg">Profile</Text>
        <Title level={4} className="m-0 capitalize">
          {data?.data?.role}
        </Title>
      </div>

      {/* Right Side - Info */}
      <div className="flex-1 space-y-4">
        <ReuseInput
          readOnly
          label="Name"
          disabled
          value="Enrique"
          // defaultValue=
          placeholder={data?.data?.customFields?.name || "N/A"}
          name="name"
          labelClassName="!font-normal !text-xl"
          inputClassName="!bg-[#F5F5F5] !text-[#535763] !border-none h-11"
        />
        <ReuseInput
          readOnly
          label="Email"
          disabled
          value="Enrique"
          placeholder={data?.data?.email || "N/A"}
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
                  disabled
                  className="!h-11 !bg-[#F5F5F5]"
                  style={{ width: 150 }}
                >
                  {countryCodes.map((country) => (
                    <Select.Option key={country.value} value={country.value}>
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
                    readOnly
                    disabled
                    value="Enrique"
                    placeholder={data?.data?.phoneNumber || "N/A"}
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
  );
};

export default ProfileInfo;
