// controllers/productController.js
const axios = require("axios");

// URL of the third-party API
const API_URL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

// Get all transactions with optional search and pagination
const getTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = "", month } = req.query;
  const regex = new RegExp(search, "i");

  try {
    // Fetch data from the third-party API
    const { data } = await axios.get(API_URL);

    // Filter data based on month (if provided)
    let filteredData = data;
    if (month) {
      filteredData = data.filter((item) => {
        const saleMonth = new Date(item.dateOfSale).getMonth() + 1; // Months are 0-indexed
        return saleMonth === parseInt(month);
      });
    }

    // Apply search filtering
    if (search) {
      filteredData = filteredData.filter(
        (item) =>
          regex.test(item.title) ||
          regex.test(item.description) ||
          regex.test(item.price.toString())
      );
    }

    // Apply pagination
    const startIndex = (page - 1) * perPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + perPage);

    res.status(200).json({ transactions: paginatedData, total: filteredData.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get statistics for a selected month
const getStatistics = async (req, res) => {
  const { month } = req.query;

  try {
    // Fetch data from the third-party API
    const { data } = await axios.get(API_URL);

    // Filter data based on month
    const filteredData = data.filter((item) => {
      const saleMonth = new Date(item.dateOfSale).getMonth() + 1;
      return saleMonth === parseInt(month);
    });

    // Calculate total sold items, unsold items, and total sales amount
    const soldItems = filteredData.filter((item) => item.sold).length;
    const unsoldItems = filteredData.length - soldItems;
    const totalSales = filteredData.reduce((sum, item) => (item.sold ? sum + item.price : sum), 0);

    res.status(200).json({
      totalSales,
      soldItems,
      unsoldItems,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get bar chart data for a selected month
const getBarChartData = async (req, res) => {
  const { month } = req.query;

  const priceRanges = [
    "0-100",
    "101-200",
    "201-300",
    "301-400",
    "401-500",
    "501-600",
    "601-700",
    "701-800",
    "801-900",
    "901-above",
  ];

  try {
    // Fetch data from the third-party API
    const { data } = await axios.get(API_URL);

    // Filter data based on month
    const filteredData = data.filter((item) => {
      const saleMonth = new Date(item.dateOfSale).getMonth() + 1;
      return saleMonth === parseInt(month);
    });

    // Calculate item counts in each price range
    const itemCounts = priceRanges.map((range) => {
      if (range === "901-above") {
        return filteredData.filter((item) => item.price > 900).length;
      } else {
        const [min, max] = range.split("-").map(Number);
        return filteredData.filter((item) => item.price >= min && item.price <= max).length;
      }
    });

    res.status(200).json({ priceRanges, itemCounts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pie chart data for a selected month
const getPieChartData = async (req, res) => {
  const { month } = req.query;

  try {
    // Fetch data from the third-party API
    const { data } = await axios.get(API_URL);

    // Filter data based on month
    const filteredData = data.filter((item) => {
      const saleMonth = new Date(item.dateOfSale).getMonth() + 1;
      return saleMonth === parseInt(month);
    });

    // Group items by category
    const categoryCounts = filteredData.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    const categories = Object.keys(categoryCounts);
    const itemCounts = Object.values(categoryCounts);

    res.status(200).json({ categories, itemCounts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
};
