/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function MultiRingChart({ loanApprovalReport }: any) {
  let value1 = 30;
  let value2 = 80;

  loanApprovalReport?.map((data: any) => {
    if (data.status === "approved") {
      value1 = data.percentage;
    } else if (data?.status === "rejected") {
      value2 = data.percentage;
    }
  });

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
            data={[
              { name: "Primary", value: 40 },
              { name: "Secondary", value: 50 },
            ]}
            innerRadius={45}
            outerRadius={60}
            startAngle={60}
            endAngle={500}
            // paddingAngle={0}
            // cornerRadius={15}
          >
            <Cell fill="#EDEBF0" />
            <Cell fill="#EDEBF0" />
          </Pie>

          {/* Green pie chart  */}
          <Pie
            data={[
              { name: "Primary", value: 50 },
              { name: "Secondary", value: 0 },
            ]}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={60}
            startAngle={0}
            endAngle={3.6 * value1}
            cornerRadius={15}
            dataKey="value"
          >
            <Cell fill="url(#greenGradient)" />
          </Pie>

          <Pie
            dataKey="value"
            data={[
              { name: "Primary", value: 40 },
              { name: "Secondary", value: 50 },
            ]}
            startAngle={60}
            endAngle={500}
            innerRadius={75}
            outerRadius={95}
          >
            <Cell fill="#EDEBF0" />
            <Cell fill="#EDEBF0" />
          </Pie>

          {/* Purple pie chart  */}
          <Pie
            data={[
              { name: "Primary", value: 50 },
              { name: "Secondary", value: 0 },
            ]}
            cx="50%"
            cy="50%"
            innerRadius={75}
            outerRadius={95}
            startAngle={0}
            endAngle={3.6 * value2}
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
