const express = require("express");
const { day3Solution } = require('./src/day3');
const app = express();
const port = 5252;

app.listen(port, () => {
  console.log(`Listening at ${port}`);
  day3Solution();
});