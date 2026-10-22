import express from "express";
import seriesRoutes from "./routes/series.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.get('/', (req, res) => {
  res.json({message: "Bienvenue sur BacRepère!"});
});

app.use("/api/series", seriesRoutes);

app.use(errorHandler);

export default app;