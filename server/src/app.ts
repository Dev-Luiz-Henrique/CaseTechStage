import express from "express";
import areaRoutes from "@/routes/AreaRoutes";
import processRoutes from "@/routes/ProcessRoutes";
import organizationalUnit from "@/routes/OrganizationalUnitRoutes";

const app = express();

app.use(express.json());
app.use("/areas", areaRoutes);
app.use("/processes", processRoutes);
app.use("/organizational-units", organizationalUnit);

export default app;
