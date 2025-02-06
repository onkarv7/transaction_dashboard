const express = require("express");
const app = express();

const transactionRoute = require("./routes/transactionsRoutes.js");

app.use("/api", transactionRoute);

//  server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
