const { dummyTransactions } = require("../utils/dummyTransactions");
const {
  findTransactions,
  getStats,
} = require("../services/transactionsService.js;");

const getTransactions = (req, res) => {
  const { month, search, page = 1 } = req.query;
  const limit = 5;
  const skip = (page - 1) * limit;

  const transactions = findTransactions({ month, search }, skip, limit);

  const stats = getStats({ month });

  const totalCount = dummyTransactions.filter(
    (item) => !month || item.month === month
  ).length;
  const totalPages = Math.ceil(totalCount / limit);

  res.json({
    transactions,
    stats,
    totalPages,
  });
};

module.exports = { getTransactions };
