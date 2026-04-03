import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const RoleSwitcher = () => {
  const { role, setRole } = useContext(AppContext);

  return (
    <div className="flex justify-end">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="rounded-md border border-slate-300 bg-white p-2 text-slate-900 dark:border-slate-600 dark:bg-black dark:text-white"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;
