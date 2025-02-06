const Transaction = require("../models/transaction");

const getTransactions = async (month, page, perPage, search) => {
  const query = {
    dateOfSale: {
      $regex: `^${month}`,
      $options: "i",
    },
  };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { price: { $regex: search, $options: "i" } },
    ];
  }

  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();

  return transactions;
};

const getStatistics = async (month) => {
  const transactions = await Transaction.find({
    dateOfSale: { $regex: `^${month}`, $options: "i" },
  });

  const totalSaleAmount = transactions.reduce(
    (acc, transaction) => acc + transaction.price,
    0
  );
  const totalSoldItems = transactions.filter(
    (transaction) => transaction.isSold
  ).length;
  const totalNotSoldItems = transactions.filter(
    (transaction) => !transaction.isSold
  ).length;

  return {
    totalSaleAmount,
    totalSoldItems,
    totalNotSoldItems,
  };
};

const getBarChartData = async (month) => {
  const transactions = await Transaction.find({
    dateOfSale: { $regex: `^${month}`, $options: "i" },
  });

  const priceRanges = [
    { range: "0-100", count: 0 },
    { range: "101-200", count: 0 },
    { range: "201-300", count: 0 },
    { range: "301-400", count: 0 },
    { range: "401-500", count: 0 },
    { range: "501-600", count: 0 },
    { range: "601-700", count: 0 },
    { range: "701-800", count: 0 },
    { range: "801-900", count: 0 },
    { range: "901-above", count: 0 },
  ];

  transactions.forEach((transaction) => {
    const price = transaction.price;
    if (price <= 100) priceRanges[0].count++;
    else if (price <= 200) priceRanges[1].count++;
    else if (price <= 300) priceRanges[2].count++;
    else if (price <= 400) priceRanges[3].count++;
    else if (price <= 500) priceRanges[4].count++;
    else if (price <= 600) priceRanges[5].count++;
    else if (price <= 700) priceRanges[6].count++;
    else if (price <= 800) priceRanges[7].count++;
    else if (price <= 900) priceRanges[8].count++;
    else priceRanges[9].count++;
  });

  return {
    priceRanges: priceRanges.map((range) => range.range),
    itemCounts: priceRanges.map((range) => range.count),
  };
};

const getPieChartData = async (month) => {
  const transactions = await Transaction.find({
    dateOfSale: { $regex: `^${month}`, $options: "i" },
  });

  const categoryCounts = {};

  transactions.forEach((transaction) => {
    if (categoryCounts[transaction.category]) {
      categoryCounts[transaction.category]++;
    } else {
      categoryCounts[transaction.category] = 1;
    }
  });

  return {
    categories: Object.keys(categoryCounts),
    itemCounts: Object.values(categoryCounts),
  };
};

module.exports = {
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
};
