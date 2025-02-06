import React from "react";
const TransactionTable = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {["Id", "Title", "Description", "Price", "Category", "Sold"].map(
              (header) => (
                <th key={header} className="px-4 py-2 border border-gray-300">
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="hover:bg-lime-50">
              {[
                transaction._id,
                transaction.title,
                transaction.description,
                transaction.price,
                transaction.category,
                transaction.sold ? "Yes" : "No",
              ].map((data, i) => (
                <td key={i} className="px-4 py-2 border border-gray-300">
                  {data}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
