import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const DarkToggle = () => {
  const { dark, setDark } = useContext(AppContext);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="rounded border border-slate-300 bg-white px-3 py-1 text-slate-900 dark:border-slate-600 dark:bg-black dark:text-white"
      type="button"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
};

export default DarkToggle;
