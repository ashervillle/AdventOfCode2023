const express = require("express");
const { day1Solution } = require('./src/day1');
const app = express();
const port = 5252;

app.listen(port, () => {
  console.log(`Listening at ${port}`);
  day1Solution();
});