"use strict";

const express = require("express");

// Constants
const PORT = 3080;
const HOST = "0.0.0.0";

const api = express();
api.get("/", (req, res) => {
  res.send("Challenge s2 api");
});

api.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
