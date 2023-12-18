const express = require("express");
const { day7Solution } = require('./src/day7');
const app = express();
const port = 5252;

app.listen(port, () => {
  console.log(`Listening at ${port}`);
  day7Solution();
});