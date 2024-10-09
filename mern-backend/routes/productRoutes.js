// routes/productRoutes.js
const express = require("express");
const {
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
} = require("../controllers/productController");

const router = express.Router();

// Route to get all transactions with search and pagination
router.get("/transactions", getTransactions);

// Route to get statistics for a selected month
router.get("/statistics", getStatistics);

// Route to get bar chart data for a selected month
router.get("/bar-chart", getBarChartData);

// Route to get pie chart data for a selected month
router.get("/pie-chart", getPieChartData);

module.exports = router;
