const path = require("path");
const parser = require("body-parser");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const appRoute = require("./route/app");

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(fileUpload());
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.use(appRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  res.status(status).json({
    title: error.title,
    msg: error.message,
  });
});

app.listen(PORT);
console.log("Listening on port " + PORT);
