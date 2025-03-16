import cors from "cors";
import express from "express";
import areaRoutes from "@/routes/AreaRoutes";
import processRoutes from "@/routes/ProcessRoutes";
import organizationalUnit from "@/routes/OrganizationalUnitRoutes";
import responsible from "@/routes/ResponsibleRoutes";
import errorHandler from "@/utils/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/areas", areaRoutes);
app.use("/processes", processRoutes);
app.use("/organizational-units", organizationalUnit);
app.use("/responsibles", responsible);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorHandler(err, req, res, next);
});

export default app;
