const express = require("express");
const { day5Solution } = require('./src/day5');
const app = express();
const port = 5252;

app.listen(port, () => {
  console.log(`Listening at ${port}`);
  day5Solution();
});