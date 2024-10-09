import axios from "axios";

const BASE_URL = "http://localhost:5000/api/products";

// Fetch transactions for a given month
export const fetchTransactions = async (month, search = "", page = 1, perPage = 10) => {
  const response = await axios.get(`${BASE_URL}/transactions`, {
    params: { month, search, page, perPage },
  });
  return response.data;
};

// Fetch statistics for a selected month
export const fetchStatistics = async (month) => {
  const response = await axios.get(`${BASE_URL}/statistics`, { params: { month } });
  return response.data;
};

// Fetch bar chart data for a selected month
export const fetchBarChartData = async (month) => {
  const response = await axios.get(`${BASE_URL}/bar-chart`, { params: { month } });
  return response.data;
};

// Fetch pie chart data for a selected month
export const fetchPieChartData = async (month) => {
  const response = await axios.get(`${BASE_URL}/pie-chart`, { params: { month } });
  return response.data;
};
