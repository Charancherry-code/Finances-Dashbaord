import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Panel from "./Panel";

const LineChartBox = ({ data }) => {
  const isEmpty = data.length === 0;

  return (
    <Panel className="h-85">
      <h2 className="mb-2 text-sm text-gray-500 dark:text-slate-400">
        Spending Trend
      </h2>

      {isEmpty ? (
        // Nothing to plot yet, so keep the panel clean.
        <div className="flex h-62.5 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white text-sm text-gray-500 dark:border-slate-700 dark:bg-black dark:text-slate-400">
          No transactions to chart yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="78%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="#6b7280"
              fontSize={12}
              width={40}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                background: "#ffffff",
              }}
              itemStyle={{ color: "#111827" }}
              formatter={(value) => [
                `₹ ${Number(value).toLocaleString("en-IN")}`,
                "Amount",
              ]}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6b7280"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Panel>
  );
};

export default LineChartBox;
