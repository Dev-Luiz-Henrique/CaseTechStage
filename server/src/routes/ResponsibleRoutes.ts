import { Router } from "express";
import { ResponsibleController } from "@/controllers/ResponsibleController";
import { ResponsibleService } from "@/services/Responsible/ResponsibleService";
import { PrismaResponsibleRepository } from "@/repositories/Responsible/PrismaResponsibleRepository";
import { ProcessService } from "@/services/Process/ProcessService";
import { PrismaProcessRepository } from "@/repositories/Process/PrismaProcessRepository";
import { OrganizationalUnitService } from "@/services/OrganizationalUnit/OrganizationalUnitService";
import { PrismaOrganizationalUnitRepository } from "@/repositories/OrganizationalUnit/PrismaOrganizationalUnitRepository";

const router = Router();

const processRepository = new PrismaProcessRepository();
const responsibleRepository = new PrismaResponsibleRepository();
const organizationalUnitRepository = new PrismaOrganizationalUnitRepository();

const processService = new ProcessService(processRepository);
const organizationalUnitService = new OrganizationalUnitService(organizationalUnitRepository);
const responsibleService = new ResponsibleService(responsibleRepository, processService, organizationalUnitService);

const responsibleController = new ResponsibleController(responsibleService);

router.get("/", responsibleController.getAll);
router.post("/assign", responsibleController.assign);
router.post("/unassign", responsibleController.unassign);
router.get("/:processId/:organizationalUnitId", responsibleController.getByProcessAndUnit);

export default router;
