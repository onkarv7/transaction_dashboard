const express = require("express");
const router = express.Router();
const validateMonth = require("../middleware/validateMonth");
const transactionController = require("../controllers/transactionController");

// Route to get all transactions
router.get(
  "/transactions",
  validateMonth,
  transactionController.getAllTransactions
);

// Route to get statistics for the selected month
router.get("/statistics", validateMonth, transactionController.getStatistics);

// Route to get bar chart data for the selected month
router.get("/bar-chart", validateMonth, transactionController.getBarChartData);

// Route to get pie chart data for the selected month
router.get("/pie-chart", validateMonth, transactionController.getPieChartData);

module.exports = router;
