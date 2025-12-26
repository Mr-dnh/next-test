const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data.json");

const readData = () =>
  JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

const writeData = (data) =>
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

app.get("/data", (req, res) => {
  res.json(readData());
});

app.post("/data", (req, res) => {
  writeData({
    tasks: req.body.tasks || []
  });
  res.json({ status: "saved" });
});

app.listen(4000, () =>
  console.log("API running on http://localhost:4000")
);
