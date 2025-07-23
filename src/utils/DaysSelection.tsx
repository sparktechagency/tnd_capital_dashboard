/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, Select } from "antd";
import { useState } from "react";

interface DaysSelectionProps {
  currentUser: string;
  setCurrentUser: (value: string) => void;
}

interface DaysSelection {
  value: string;
  label: string;
}

const DaysSelection: React.FC<DaysSelectionProps> = ({
  currentUser,
  setCurrentUser,
}) => {
  const [usersOptions] = useState<DaysSelection[]>([
    { value: "days", label: "Days" },
    { value: "month", label: "Month" },
    { value: "student", label: "Student" },
  ]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            colorTextQuaternary: "#F9FAFB",
            fontSize: 18,
            borderRadius: 4,
            colorBorder: "#979699",
            colorText: "#979699",
            colorIcon: "#000000",
            colorBgContainer: "#fff",
            colorBgElevated: "#28314E",
            selectorBg: "#fff",
            colorTextPlaceholder: "#979699",
            optionSelectedBg: "#FFFFFF",
            optionSelectedColor: "#000",
          },
        },
      }}
    >
      <Select
        value={currentUser}
        style={{ width: 100, height: 40 }}
        options={usersOptions}
        onChange={(value) => setCurrentUser(value)}
      />
    </ConfigProvider>
  );
};

export default DaysSelection;
