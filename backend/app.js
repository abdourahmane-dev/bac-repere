const express = require("express");

const app = express();

app.get('/', (req, res) => {
  res.json({message: "Bienvenue sur BacRepère!"});
})

module.exports = app;