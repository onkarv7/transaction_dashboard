import React from "react";
const StatsCard = ({ stat }) => {
  return (
    <div
      className={`p-4 rounded-xl shadow-md border border-gray-300 hover:border-dotted hover:border-purple ${stat.bg}`}
    >
      <h3 className="font-bold text-center text-lg">{stat.label}</h3>
      <p className="text-xl text-center font-semibold">{stat.value}</p>
    </div>
  );
};

export default StatsCard;
