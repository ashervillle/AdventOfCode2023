const express = require("express");
const { day8Solution } = require('./src/day8');
const app = express();
const port = 5252;

app.listen(port, () => {
  console.log(`Listening at ${port}`);
  day8Solution();
});