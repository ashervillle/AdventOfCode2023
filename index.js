const express = require("express");
const { day2Solution } = require('./src/day2');
const app = express();
const port = 5252;

app.listen(port, () => {
  console.log(`Listening at ${port}`);
  day2Solution();
});