import React, { useEffect, useState } from "react";
import { fetchTransactions } from "/api/productAPI";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("3"); // Default month: March

  useEffect(() => {
    const loadTransactions = async () => {
      const data = await fetchTransactions(month, search, page, 10);
      setTransactions(data.transactions);
    };
    loadTransactions();
  }, [page, search, month]);

  return (
    <div>
      <h2>Transactions Table</h2>
      <div>
        <label>Month: </label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          {/* Add options for other months */}
        </select>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default TransactionsTable;
