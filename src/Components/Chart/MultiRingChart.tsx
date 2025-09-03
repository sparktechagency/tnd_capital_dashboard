/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data1 = [
  { name: "Primary", value: 26.8 },
  { name: "Secondary", value: 73.2 },
];

const data2 = [
  { name: "Primary", value: 24.51 },
  { name: "Secondary", value: 75.49 },
];
export default function MultiRingChart({ loanApprovalReport }: any) {
  console.log(loanApprovalReport, "loanApprovalReport");

  // const data1 = [
  //   {
  //     name: "Primary",
  //     value:
  //       loanApprovalReport?.status === "approved"
  //         ? loanApprovalReport?.percentage
  //         : 0,
  //   },
  //   {
  //     name: "Secondary",
  //     value:
  //       loanApprovalReport?.status === "approved"
  //         ? loanApprovalReport?.percentage
  //         : 0,
  //   },
  // ];

  return (
    <div style={{ width: 300, height: 290 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="greenGradient" x1="1" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3ED944" />
              <stop offset="100%" stopColor="#B4E7B9" />
            </linearGradient>
            <linearGradient id="purpleGradient" x1="1" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4F3CC0" />
              <stop offset="100%" stopColor="#D8D4EC" />
            </linearGradient>
          </defs>

          <Pie
            dataKey="value"
            data={data1}
            innerRadius={45}
            outerRadius={60}
            startAngle={90}
            endAngle={460}
            // paddingAngle={0}
            // cornerRadius={15}
          >
            <Cell fill="#EDEBF0" />
            <Cell fill="#EDEBF0" />
          </Pie>

          {/* Green pie chart  */}
          <Pie
            data={[{ name: "Primary", value: 26.8 }]}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={60}
            startAngle={200}
            endAngle={50}
            cornerRadius={15}
            dataKey="value"
          >
            <Cell fill="url(#greenGradient)" />
          </Pie>

          <Pie
            dataKey="value"
            data={data2}
            startAngle={90}
            endAngle={460}
            innerRadius={75}
            outerRadius={95}
          >
            <Cell fill="#EDEBF0" />
            <Cell fill="#EDEBF0" />
          </Pie>

          {/* Purple pie chart  */}
          <Pie
            data={[{ name: "Primary", value: 26.8 }]}
            cx="50%"
            cy="50%"
            innerRadius={75}
            outerRadius={95}
            startAngle={200}
            endAngle={50}
            cornerRadius={15}
            dataKey="value"
          >
            <Cell fill="url(#purpleGradient)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
