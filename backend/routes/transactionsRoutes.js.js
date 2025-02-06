const express = require("express");
const router = express.Router();

const { getTransactions } = require("../controllers/transactionController");

// const {
//   getTransactions,
//   getStats,
// } = require("../controllers/transactionController");

router.get("/transactions", getTransactions);

module.exports = router;
