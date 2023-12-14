const express = require("express");
const { day6Solution } = require('./src/day6');
const app = express();
const port = 5252;

app.listen(port, () => {
  console.log(`Listening at ${port}`);
  day6Solution();
});