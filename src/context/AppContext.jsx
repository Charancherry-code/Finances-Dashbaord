import { createContext, useState, useEffect } from "react";
import { transactions as initialData } from "../data/mockData";

export const AppContext = createContext();

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

// Keep the starter rows visible even after localStorage already has saved data.
const mergeSeedTransactions = (savedTransactions) => {
  const transactionsById = new Map(
    (Array.isArray(savedTransactions) ? savedTransactions : []).map((item) => [
      item.id,
      item,
    ]),
  );

  initialData.forEach((item) => {
    if (!transactionsById.has(item.id)) {
      transactionsById.set(item.id, item);
    }
  });

  return Array.from(transactionsById.values()).sort((a, b) => a.id - b.id);
};

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    if (typeof window === "undefined") return initialData;

    return mergeSeedTransactions(
      safeParse(localStorage.getItem("transactions"), initialData),
    );
  });

  const [role, setRole] = useState(() => {
    if (typeof window === "undefined") return "viewer";

    return localStorage.getItem("role") || "viewer";
  });
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  useEffect(() => {
    // Toggle the root class so all dark styles switch together.
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const addTransaction = (newTx) => {
    setTransactions((prev) => [{ ...newTx, id: Date.now() }, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        search,
        setSearch,
        addTransaction,
        dark,
        setDark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
