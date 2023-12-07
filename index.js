const express = require("express");
const { day4Solution } = require('./src/day4');
const app = express();
const port = 5252;

app.listen(port, () => {
  console.log(`Listening at ${port}`);
  day4Solution();
});