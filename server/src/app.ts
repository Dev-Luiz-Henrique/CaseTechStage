import express from "express";
import areaRoutes from "./routes/AreaRoutes";

const app = express();

app.use(express.json());
app.use("/areas", areaRoutes);

export default app;
