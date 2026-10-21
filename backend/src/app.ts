import express from "express";

const app = express();

app.get('/', (req, res) => {
  res.json({message: "Bienvenue sur BacRepère!"});
})

export default app;