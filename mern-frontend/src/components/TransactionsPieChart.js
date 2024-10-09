// src/components/TransactionsPieChart.js
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { fetchPieChartData } from "../api/ProductAPI";
import "../styles.css";

const TransactionsPieChart = ({ month }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const loadPieChartData = async () => {
      const data = await fetchPieChartData(month);
      setChartData({
        labels: data.categories,
        datasets: [
          {
            label: "Number of Items",
            data: data.itemCounts,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
          },
        ],
      });
    };
    loadPieChartData();
  }, [month]);

  return (
    <div className="chart-container">
      <h2>Category Distribution Pie Chart</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default TransactionsPieChart;
