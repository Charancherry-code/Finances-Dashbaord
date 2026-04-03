import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Panel from "./Panel";

const AddTransaction = () => {
  const { addTransaction, role } = useContext(AppContext);

  const [form, setForm] = useState({
    date: "",
    category: "",
    type: "expense",
    amount: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message && !error) return;

    const timer = window.setTimeout(() => {
      setMessage("");
      setError("");
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [message, error]);

  if (role !== "admin") return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim the form values before checking them.
    const category = form.category.trim();
    const amount = Number(form.amount);

    // Block incomplete or invalid entries.
    if (!form.date || !category || !form.amount) {
      setError("Fill in date, category, and amount.");
      setMessage("");
      return;
    }

    if (Number.isNaN(amount) || amount <= 0) {
      setError("Amount must be greater than zero.");
      setMessage("");
      return;
    }

    // Save the new row at the top so it shows up right away.
    addTransaction({
      date: form.date,
      category,
      type: form.type,
      amount,
    });

    setError("");
    setMessage("Transaction added successfully.");

    setForm({
      date: "",
      category: "",
      type: "expense",
      amount: "",
    });
  };

  return (
    <Panel>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Add Transaction
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Admin only. Transactions are saved to localStorage.
          </p>
        </div>
      </div>

      {(error || message) && (
        <div
          className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
            error
              ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
              : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
          }`}
        >
          {error || message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-4">
        <input
          type="date"
          className="border p-2 rounded bg-white dark:border-slate-700 dark:bg-black dark:text-white"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-2 rounded bg-white dark:border-slate-700 dark:bg-black dark:text-white"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <select
          className="border p-2 rounded bg-white dark:border-slate-700 dark:bg-black dark:text-white"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="number"
          min="1"
          step="1"
          placeholder="Amount"
          className="border p-2 rounded bg-white dark:border-slate-700 dark:bg-black dark:text-white"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <button
          className="bg-gray-900 text-white p-2 rounded dark:bg-white dark:text-black md:col-span-4"
          type="submit"
        >
          Add Transaction
        </button>
      </form>
    </Panel>
  );
};

export default AddTransaction;
