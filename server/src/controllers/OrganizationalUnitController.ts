import { RequestHandler } from "express";
import { IOrganizationalUnitService } from "@/services/OrganizationalUnit/IOrganizationalUnitService";
import { idSchema, organizationalUnitSchema } from "@/utils/validators";

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
            const { id } = idSchema.parse(req.params);
            
            const unit = await this.organizationalUnitService.getById(BigInt(id));
            res.status(200).json(unit);
        } catch (error) {
            next(error);
        }
    };

    create: RequestHandler = async (req, res, next) => {
        try {
            const { name, parentId } = organizationalUnitSchema.parse(req.body);

            const newUnit = await this.organizationalUnitService.create(name, parentId ? BigInt(parentId) : null);
            res.status(201).json(newUnit);
        } catch (error) {
            next(error);
        }
    };

    update: RequestHandler = async (req, res, next) => {
        try {
            const { id } = idSchema.parse(req.params);
            const { name, parentId } = organizationalUnitSchema.partial().parse(req.body);

            const updatedUnit = await this.organizationalUnitService.update(BigInt(id), name, parentId ? BigInt(parentId) : null);
            res.status(200).json(updatedUnit);
        } catch (error) {
            next(error);
        }
    };

    delete: RequestHandler = async (req, res, next) => {
        try {
            const { id } = idSchema.parse(req.params);

            await this.organizationalUnitService.delete(BigInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
