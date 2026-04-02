import Panel from "./Panel";

const SummaryCard = ({ title, amount }) => {
  return (
    <Panel className="w-full">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="mt-2 text-xl font-bold">
        ₹ {amount.toLocaleString("en-IN")}
      </p>
    </Panel>
  );
};

export default SummaryCard;
