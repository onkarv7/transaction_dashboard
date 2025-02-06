const express = require("express");
const app = express();
const cors = require("cors");

const allowedOrigins = ["https://transaction-dashboard-1yw3.vercel.app"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

const transactionRoute = require("./routes/transactionsRoutes.js");

app.use("/api", transactionRoute);

//  server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
