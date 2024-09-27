require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//parsing the JSON with SizeLimiting....
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
const cors = require("cors");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//Setuping EJS just for the STRIPE PAYMENT_POPUP
app.set('view engine','ejs');
app.set('views', './views');

//routes Integration
const paymentRoutes = require("./routes/payment.routes");
const connectDB = require("./dbConfig/dbConfig");
app.use("/API/payment", paymentRoutes);

//for Authentication the DB
connectDB
  .authenticate()
  .then(() => {
    console.log("Database Connected SuccessFully");
  })
  .catch((err) => {
    console.log("Error While Connecting to Database!", err);
  });

//For Tbales
connectDB
  .sync()
  .then(() => {
    console.log("Database Tables Synced Successfully");
  })
  .catch((err) => {
    console.error("Error syncing database tables:", err);
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
