const express = require("express");
const { day10Solution } = require('./src/day10');
const app = express();
const port = 5252;

app.listen(port, () => {
  console.log(`Listening at ${port}`);
  day10Solution();
});