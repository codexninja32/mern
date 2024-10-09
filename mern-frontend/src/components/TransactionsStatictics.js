// src/components/TransactionsStatistics.js
import React, { useEffect, useState } from "react";
import { fetchStatistics } from "../api/ProductAPI"; // Ensure this path is correct

const TransactionsStatistics = ({ month }) => {
  const [statistics, setStatistics] = useState({ totalSales: 0, soldItems: 0, unsoldItems: 0 });

  useEffect(() => {
    const loadStatistics = async () => {
      const data = await fetchStatistics(month);
      setStatistics(data);
    };
    loadStatistics();
  }, [month]);

  return (
    <div className="statistics-box">
      <h2>Transactions Statistics</h2>
      <div className="statistics-item">
        <strong>Total Sales:</strong> ${statistics.totalSales}
      </div>
      <div className="statistics-item">
        <strong>Sold Items:</strong> {statistics.soldItems}
      </div>
      <div className="statistics-item">
        <strong>Unsold Items:</strong> {statistics.unsoldItems}
      </div>
    </div>
  );
};

export default TransactionsStatistics;
