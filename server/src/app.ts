import express from "express";
import areaRoutes from "@/routes/AreaRoutes";
import processRoutes from "@/routes/ProcessRoutes";

const app = express();

app.use(express.json());
app.use("/areas", areaRoutes);
app.use("/processes", processRoutes);

export default app;
