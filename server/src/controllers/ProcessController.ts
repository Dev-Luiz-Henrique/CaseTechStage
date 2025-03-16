import { RequestHandler } from "express";
import { IProcessService } from "@/services/Process/IProcessService";

export class ProcessController {
    constructor(private processService: IProcessService) {}

    getAll: RequestHandler = async (req, res, next) => {
        try {
            const processes = await this.processService.getAll();
            res.status(200).json(processes);
        } catch (error) {
            next(error);
        }
    };

    getById: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const process = await this.processService.getById(BigInt(id));
            if (!process)
                res.status(404).json({ message: "Process not found" });
            else
                res.status(200).json(process);
        } catch (error) {
            next(error);
        }
    };

    create: RequestHandler = async (req, res, next) => {
        try {
            const { name, description, documentation, tools, areaId, parentId } = req.body;
            const newProcess = await this.processService.create({
                name,
                description,
                documentation,
                tools,
                areaId: BigInt(areaId),
                parentId: parentId ? BigInt(parentId) : null
            });
            res.status(201).json(newProcess);
        } catch (error) {
            next(error);
        }
    };

    update: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, description, documentation, tools, areaId, parentId } = req.body;
            const updatedProcess = await this.processService.update(BigInt(id), {
                name,
                description,
                documentation,
                tools,
                areaId: areaId ? BigInt(areaId) : undefined,
                parentId: parentId ? BigInt(parentId) : undefined
            });
            res.status(200).json(updatedProcess);
        } catch (error) {
            next(error);
        }
    };

    delete: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            await this.processService.delete(BigInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
