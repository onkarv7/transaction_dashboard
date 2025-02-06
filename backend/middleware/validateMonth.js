const validateMonth = (req, res, next) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { month } = req.query;
  if (!month || !months.includes(month)) {
    return res
      .status(400)
      .json({ message: "Invalid month. Please select a valid month." });
  }

  next();
};

module.exports = validateMonth;
