import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Panel from "./Panel";

const TransactionTable = () => {
  const { transactions, role, setTransactions } = useContext(AppContext);

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Panel>
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Transactions
      </h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-slate-500 dark:border-slate-700 dark:text-slate-400">
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Amount</th>
              {role === "admin" && <th className="pb-3 font-medium">Action</th>}
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={role === "admin" ? 5 : 4}
                  className="py-8 text-center text-slate-500 dark:text-slate-400"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-b transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
                >
                  <td className="py-3 text-slate-700 dark:text-slate-300">
                    {t.date}
                  </td>
                  <td className="py-3 font-medium text-slate-900 dark:text-white">
                    {t.category}
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                        t.type === "income"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="py-3 font-medium text-slate-900 dark:text-white">
                    ₹ {Number(t.amount).toLocaleString("en-IN")}
                  </td>

                  {role === "admin" && (
                    <td className="py-3">
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-rose-500/20 dark:text-rose-300 dark:hover:bg-rose-500/10"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Panel>
  );
};

export default TransactionTable;
