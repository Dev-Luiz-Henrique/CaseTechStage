import { Router } from "express";
import { AreaController } from "@/controllers/AreaController";
import { AreaService } from "@/services/Area/AreaService";
import { PrismaAreaRepository } from "@/repositories/Area/PrismaAreaRepository";

const router = Router();

const areaRepository = new PrismaAreaRepository();
const areaService = new AreaService(areaRepository);
const areaController = new AreaController(areaService);

router.get("/", areaController.getAll);
router.get("/:id", areaController.getById);
router.post("/", areaController.create);
router.put("/:id", areaController.update);
router.delete("/:id", areaController.delete);

export default router;
