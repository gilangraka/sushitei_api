require("dotenv").config({});

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const route = require("./src/routes");

app.use(morgan("dev"));
app.use(cors());
function rawBodySaver(req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
}

app.use(
  express.urlencoded({ extended: false, limit: "50mb", verify: rawBodySaver })
);
app.use(express.json({ limit: "50mb" }));

app.use(express.static("./asset/"));

app.use("/api", route);

app.use((req, res, next) => {
  res.status(200).json({ status: "404", message: "URL not found" });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`API Running PORT : ${port}`);
});

module.exports = app;
