import { Router } from "express";
import { ResponsibleController } from "@/controllers/ResponsibleController";
import { ResponsibleService } from "@/services/Responsible/ResponsibleService";
import { PrismaResponsibleRepository } from "@/repositories/Responsible/PrismaResponsibleRepository";

const router = Router();

const responsibleRepository = new PrismaResponsibleRepository();
const responsibleService = new ResponsibleService(responsibleRepository);
const responsibleController = new ResponsibleController(responsibleService);

router.get("/", responsibleController.getAll);
router.post("/assign", responsibleController.assign);
router.post("/unassign", responsibleController.unassign);

export default router;
