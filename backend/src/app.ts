import express from "express";
import seriesRoutes from "./routes/series.routes.js";
import subjectsRoutes from "./routes/subjects.routes.js";
import topicsRoutes from "./routes/topics.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.get('/', (req, res) => {
  res.json({message: "Bienvenue sur BacRepère!"});
});

app.use("/api/series", seriesRoutes);
app.use("/api/subjects", subjectsRoutes);
app.use("/api/topics", topicsRoutes);

app.use(errorHandler);

export default app;