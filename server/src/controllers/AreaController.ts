import { RequestHandler } from "express";
import { IAreaService } from "@/services/Area/IAreaService";

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
            const { id } = req.params;
            const area = await this.areaService.getById(BigInt(id));
            if (!area)
                res.status(404).json({ message: "Area not found" });
            else
                res.status(200).json(area);
        } catch (error) {
            next(error);
        }
    };

    create: RequestHandler = async (req, res, next) => {
        try {
            const { name } = req.body;
            const newArea = await this.areaService.create(name);
            res.status(201).json(newArea);
        } catch (error) {
            next(error);
        }
    };

    update: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updatedArea = await this.areaService.update(BigInt(id), name);
            res.status(200).json(updatedArea);
        } catch (error) {
            next(error);
        }
    };

    delete: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.areaService.delete(BigInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
