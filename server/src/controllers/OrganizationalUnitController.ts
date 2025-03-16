import { RequestHandler } from "express";
import { IOrganizationalUnitService } from "@/services/OrganizationalUnit/IOrganizationalUnitService";

export class OrganizationalUnitController {
    constructor(private organizationalUnitService: IOrganizationalUnitService) {}

    getAll: RequestHandler = async (req, res, next) => {
        try {
            const units = await this.organizationalUnitService.getAll();
            res.status(200).json(units);
        } catch (error) {
            next(error);
        }
    };

    getById: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const unit = await this.organizationalUnitService.getById(BigInt(id));
            if (!unit)
                res.status(404).json({ message: "Organizational Unit not found" });
            else
                res.status(200).json(unit);
        } catch (error) {
            next(error);
        }
    };

    create: RequestHandler = async (req, res, next) => {
        try {
            const { name, parentId } = req.body;
            const newUnit = await this.organizationalUnitService.create(name, parentId ? BigInt(parentId) : null);
            res.status(201).json(newUnit);
        } catch (error) {
            next(error);
        }
    };

    update: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, parentId } = req.body;
            const updatedUnit = await this.organizationalUnitService.update(BigInt(id), name, parentId ? BigInt(parentId) : null);
            res.status(200).json(updatedUnit);
        } catch (error) {
            next(error);
        }
    };

    delete: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.organizationalUnitService.delete(BigInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
