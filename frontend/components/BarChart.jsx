import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const priceRangesData = Object.entries(data?.priceRanges || {}).map(
    ([range, count]) => ({ range, count })
  );

  const chartData = {
    labels: priceRangesData.map((data) => data.range),
    datasets: [
      {
        label: "Item Count",
        data: priceRangesData.map((data) => data.count),
        backgroundColor: "#42a5f5",
        borderColor: "#1e88e5",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart maintains its aspect ratio when resized
    plugins: {
      title: {
        display: true,
        text: "Price Range Distribution",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[300px] sm:w-[600px] md:w-[700px] lg:w-[1000px] bg-sky-50 p-4 rounded-xl">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
