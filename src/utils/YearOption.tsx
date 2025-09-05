/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, Select } from "antd";
import { useEffect, useState } from "react";

// Define types for the props
interface YearOptionProps {
  currentYear: number;
  setThisYear: (year: any) => void; // Function to set the selected year
}

interface YearOption {
  value: string;
  label: string;
}

const YearOption: React.FC<YearOptionProps> = ({
  currentYear,
  setThisYear,
}) => {
  const [yearOptions, setYearOptions] = useState<YearOption[]>([]); // Type state as an array of YearOption objects
  console.log(currentYear, "currentYear in YearOption");
  useEffect(() => {
    const startYear = 2020;
    const yearRange: YearOption[] = [];

    // Add the years to the list
    for (let i = startYear; i <= currentYear; i++) {
      yearRange.push({ value: i.toString(), label: i.toString() });
    }

    setYearOptions(yearRange);
  }, [currentYear]);

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
            colorIcon: "#979699",
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
        defaultValue={currentYear >= 2025 ? "2025" : currentYear.toString()}
        style={{ width: 100 }}
        options={yearOptions}
        onChange={(value) => setThisYear(value)}
      />
    </ConfigProvider>
  );
};

export default YearOption;
