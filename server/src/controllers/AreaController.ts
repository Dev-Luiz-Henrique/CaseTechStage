import { RequestHandler } from "express";
import { IAreaService } from "@/services/Area/IAreaService";
import { idSchema, areaSchema } from "@/utils/validators";

export class AreaController {
    constructor(private areaService: IAreaService) {}

    getAll: RequestHandler = async (req, res, next) => {
        try {
            const areas = await this.areaService.getAll();
            res.status(200).json(areas);
        } catch (error) {
            next(error);
        }
    };

    getById: RequestHandler = async (req, res, next) => {
        try {
            const { id } = idSchema.parse(req.params);

            const area = await this.areaService.getById(BigInt(id));
            res.status(200).json(area);
        } catch (error) {
            next(error);
        }
    };

    create: RequestHandler = async (req, res, next) => {
        try {
            const { name } = areaSchema.parse(req.body);

            const newArea = await this.areaService.create(name);
            res.status(201).json(newArea);
        } catch (error) {
            next(error);
        }
    };

    update: RequestHandler = async (req, res, next) => {
        try {
            const { id } = idSchema.parse(req.params);
            const { name } = areaSchema.parse(req.body);

            const updatedArea = await this.areaService.update(BigInt(id), name);
            res.status(200).json(updatedArea);
        } catch (error) {
            next(error);
        }
    };

    delete: RequestHandler = async (req, res, next) => {
        try {
            const { id } = idSchema.parse(req.params);
            
            await this.areaService.delete(BigInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
