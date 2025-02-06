import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "../components/BarChart";
import TransactionTable from "../components/TransactionsTable";
import Pagination from "../components/Pagination";
import StatsCard from "../components/StatsCard.js";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function App() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const [month, setMonth] = useState("March");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://transaction-dashboard-rjys.onrender.com/api/transactions",
          {
            params: { month, search, page: currentPage },
          }
        );
        setTransactions(res.data.transactions);
        setStats(res.data.stats);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [month, search, currentPage]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-center sm:text-left">
          Transaction Data
        </h1>
        <select
          value={month}
          onChange={handleMonthChange}
          className="p-2 border border-gray-300 rounded w-full sm:w-auto"
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Total Amount",
            value: stats.totalAmount,
            bg: "bg-amber-100",
          },
          {
            label: "Sold Items",
            value: stats.totalSoldItems,
            bg: "bg-teal-100",
          },
          {
            label: "Not Sold Items",
            value: stats.totalNotSoldItems,
            bg: "bg-green-100",
          },
        ].map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </div>

      <div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">
            Price Range Distribution
          </h3>
          <BarChart data={stats} />
        </div>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between mb-4">
            <h2 className="text-2xl font-semibold">Transactions</h2>
            <input
              type="text"
              placeholder="Search by title"
              value={search}
              onChange={handleSearchChange}
              className="p-2 border border-gray-300 rounded-xl w-full sm:w-auto"
            />
          </div>
          <TransactionTable transactions={transactions} />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
