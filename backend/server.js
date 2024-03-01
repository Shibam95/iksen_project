const express = require("express");
require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

const cors = require("cors");

// CORS configuration
app.use(cors());

// set public folder static
app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cookieParser());

mongoose.set("strictQuery", true);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const AuthRoute = require("./route/Authroute");
app.use(AuthRoute);

const port = process.env.PORT;

const dbDriver = process.env.DBDriver;

mongoose
  .connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log("DB connected");
      console.log(`server started@ http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("DB not connceted");
    console.log(err);
  });
