// src/App.js
import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import TransactionsStatistics from "./components/TransactionsStatistics";
import TransactionsBarChart from "./components/TransactionsBarChart";
import TransactionsPieChart from "./components/TransactionsPieChart";
import "./styles.css";

function App() {
  const [month, setMonth] = useState("3"); // Default month is March

  return (
    <div className="App">
      <h1>MERN Transactions Dashboard</h1>
      <div className="month-selector">
        <label>Select Month: </label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <TransactionsStatistics month={month} />
      <TransactionsTable month={month} />
      <TransactionsBarChart month={month} />
      <TransactionsPieChart month={month} />
    </div>
  );
}

export default App;
