const transactionService = require("../services/transactionService");

const getAllTransactions = async (req, res) => {
  try {
    const { month, page = 1, perPage = 10, search = "" } = req.query;
    const transactions = await transactionService.getTransactions(
      month,
      page,
      perPage,
      search
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    const statistics = await transactionService.getStatistics(month);
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const barChartData = await transactionService.getBarChartData(month);
    res.json(barChartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;
    const pieChartData = await transactionService.getPieChartData(month);
    res.json(pieChartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
};
