import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Panel from "./Panel";

const COLORS = ["#6b7280", "#78716c", "#9ca3af", "#d1d5db"];

const PieChartBox = ({ data }) => {
  const isEmpty = data.length === 0;

  return (
    <Panel className="h-85">
      <h2 className="mb-2 text-sm text-gray-500 dark:text-slate-400">
        Category Breakdown
      </h2>

      {isEmpty ? (
        // Keep the empty state readable when there are no expenses yet.
        <div className="flex h-62.5 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white text-sm text-gray-500 dark:border-slate-700 dark:bg-black dark:text-slate-400">
          Add an expense to see category data.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="78%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              outerRadius={90}
              innerRadius={52}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
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
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Panel>
  );
};

export default PieChartBox;
