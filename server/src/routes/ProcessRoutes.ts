import { Router } from "express";
import { ProcessController } from "@/controllers/ProcessController";
import { ProcessService } from "@/services/Process/ProcessService";
import { PrismaProcessRepository } from "@/repositories/Process/PrismaProcessRepository";

const router = Router();

const processRepository = new PrismaProcessRepository();
const processService = new ProcessService(processRepository);
const processController = new ProcessController(processService);

router.get("/", processController.getAll);
router.get("/:id", processController.getById);
router.post("/", processController.create);
router.put("/:id", processController.update);
router.delete("/:id", processController.delete);

export default router;
