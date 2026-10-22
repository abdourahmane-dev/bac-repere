import express from "express";
import seriesRoutes from "./routes/series.routes.js";

const app = express();

app.get('/', (req, res) => {
  res.json({message: "Bienvenue sur BacRepère!"});
});

app.use("/api/series", seriesRoutes);

export default app;
