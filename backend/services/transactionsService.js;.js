const { dummyTransactions } = require("../utils/dummyTransactions");

const findTransactions = (filter, skip, limit) => {
  let filteredData = dummyTransactions.filter((item) => {
    if (filter.month && item.month !== filter.month) return false;
    if (
      filter.search &&
      !item.title.toLowerCase().includes(filter.search.toLowerCase())
    )
      return false;
    return true;
  });

  return filteredData.slice(skip, skip + limit);
};

const getStats = (filter) => {
  const filteredData = dummyTransactions.filter((item) => {
    if (filter.month && item.month !== filter.month) return false;
    return true;
  });

  const totalAmount = filteredData.reduce((acc, item) => acc + item.price, 0);
  const totalSoldItems = filteredData.filter((item) => item.sold).length;
  const totalNotSoldItems = filteredData.filter((item) => !item.sold).length;

  const priceRanges = {
    "Under 100": filteredData.filter((item) => item.price < 100).length,
    "100-200": filteredData.filter(
      (item) => item.price >= 100 && item.price < 200
    ).length,
    "200-300": filteredData.filter(
      (item) => item.price >= 200 && item.price < 300
    ).length,
    "300-400": filteredData.filter(
      (item) => item.price >= 300 && item.price < 400
    ).length,
    "Above 400": filteredData.filter((item) => item.price >= 400).length,
  };

  return {
    totalAmount,
    totalSoldItems,
    totalNotSoldItems,
    priceRanges,
  };
};

module.exports = { findTransactions, getStats };
