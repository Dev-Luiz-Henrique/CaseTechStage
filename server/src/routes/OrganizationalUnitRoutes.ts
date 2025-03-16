import { Router } from "express";
import { OrganizationalUnitController } from "@/controllers/OrganizationalUnitController";
import { OrganizationalUnitService } from "@/services/OrganizationalUnit/OrganizationalUnitService";
import { PrismaOrganizationalUnitRepository } from "@/repositories/OrganizationalUnit/PrismaOrganizationalUnitRepository";

const router = Router();

const organizationalUnitRepository = new PrismaOrganizationalUnitRepository();
const organizationalUnitService = new OrganizationalUnitService(organizationalUnitRepository);
const organizationalUnitController = new OrganizationalUnitController(organizationalUnitService);

router.get("/", organizationalUnitController.getAll);
router.get("/:id", organizationalUnitController.getById);
router.post("/", organizationalUnitController.create);
router.put("/:id", organizationalUnitController.update);
router.delete("/:id", organizationalUnitController.delete);

export default router;
