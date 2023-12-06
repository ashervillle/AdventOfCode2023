const express = require("express");
const { test } = require('./src/app');
const app = express();
const port = 5252;

app.listen(port, () => {
  console.log(`Listening at ${port}`);
  test();
});