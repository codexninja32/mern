// src/components/TransactionsBarChart.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { fetchBarChartData } from "/api/productAPI";
import { Chart as ChartJS } from 'chart.js/auto';
import "./styles.css";

const TransactionsBarChart = ({ month }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const loadBarChartData = async () => {
      const data = await fetchBarChartData(month);
      setChartData({
        labels: data.priceRanges,
        datasets: [
          {
            label: "Number of Items",
            data: data.itemCounts,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });
    };
    loadBarChartData();
  }, [month]);

  return (
    <div className="chart-container">
      <h2>Price Range Bar Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default TransactionsBarChart;
