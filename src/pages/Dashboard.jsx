import { useContext } from "react";
import { AppContext } from "../context/AppContext";

import SummaryCard from "../components/SummaryCard";
import LineChartBox from "../components/LineChartBox";
import PieChartBox from "../components/PieChartBox";
import TransactionTable from "../components/TransactionTable";
import RoleSwitcher from "../components/RoleSwitcher";
import DarkToggle from "../components/DarkToggle";
import AddTransaction from "../components/AddTransaction";

const Dashboard = () => {
  const { transactions } = useContext(AppContext);

  // Keep the timeline in date order so the chart reads naturally.
  const sortedTransactions = [...transactions].sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  // Split the data once so the summary cards stay simple.
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  // Shape the chart data into the format Recharts expects.
  const chartData = sortedTransactions.map((t) => ({
    date: t.date.slice(5),
    amount: t.amount,
  }));

  // Group expenses by category for the pie chart and insights panel.
  const categoryData = Object.values(
    transactions.reduce((acc, curr) => {
      if (curr.type === "expense") {
        acc[curr.category] = acc[curr.category] || {
          category: curr.category,
          value: 0,
        };
        acc[curr.category].value += curr.amount;
      }
      return acc;
    }, {}),
  );

  const highestCategory = [...categoryData].sort(
    (a, b) => b.value - a.value,
  )[0];

  const emptyTransactions = transactions.length === 0;

  return (
    <div className="min-h-screen bg-white px-4 py-6 text-slate-900 dark:bg-black dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-black lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Personal finance overview
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Finance Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
              Track your balance, expenses, and activity with a clean daily
              view.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <DarkToggle />
            <RoleSwitcher />
          </div>
        </header>

        {/* Main numbers */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SummaryCard title="Total Balance" amount={balance} />
          <SummaryCard title="Income" amount={income} />
          <SummaryCard title="Expenses" amount={expenses} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <LineChartBox data={chartData} />
          </div>
          <PieChartBox data={categoryData} />
        </div>

        {/* Quick insights */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-black">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Insights
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                A quick read on the current state of your finances.
              </p>
            </div>

            <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {transactions.length} transaction
              {transactions.length === 1 ? "" : "s"}
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Highest spending category
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {highestCategory?.category || "No expense data yet"}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Current balance
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                ₹ {balance.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900 sm:col-span-2 xl:col-span-1">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Activity status
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {emptyTransactions ? "No transactions yet" : "Data loaded"}
              </p>
            </div>
          </div>
        </section>

        <AddTransaction />

        <TransactionTable />
      </div>
    </div>
  );
};

export default Dashboard;
