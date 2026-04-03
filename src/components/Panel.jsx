const Panel = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-md dark:border-slate-700 dark:bg-black dark:text-white ${className}`}
    >
      {children}
    </div>
  );
};

export default Panel;
