const express = require("express");
const { day9Solution } = require('./src/day9');
const app = express();
const port = 5252;

app.listen(port, () => {
  console.log(`Listening at ${port}`);
  day9Solution();
});