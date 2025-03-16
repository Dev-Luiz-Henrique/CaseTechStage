import { RequestHandler } from "express";
import { IProcessService } from "@/services/Process/IProcessService";
import { idSchema, processSchema } from "@/utils/validators";

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
            const { id } = idSchema.parse(req.params);
            
            const process = await this.processService.getById(BigInt(id));
            res.status(200).json(process);
        } catch (error) {
            next(error);
        }
    };

    create: RequestHandler = async (req, res, next) => {
        try {
            const validatedData = processSchema.parse(req.body);

            const newProcess = await this.processService.create({
                ...validatedData,
                areaId: BigInt(validatedData.areaId),
                parentId: validatedData.parentId ? BigInt(validatedData.parentId) : null
            });
            res.status(201).json(newProcess);
        } catch (error) {
            next(error);
        }
    };

    update: RequestHandler = async (req, res, next) => {
        try {
            const { id } = idSchema.parse(req.params);
            const validatedData = processSchema.partial().parse(req.body);

            const updatedProcess = await this.processService.update(BigInt(id), {
                ...validatedData,
                areaId: validatedData.areaId ? BigInt(validatedData.areaId) : undefined,
                parentId: validatedData.parentId ? BigInt(validatedData.parentId) : undefined
            });
            res.status(200).json(updatedProcess);
        } catch (error) {
            next(error);
        }
    };

    delete: RequestHandler = async (req, res, next) => {
        try {
            const { id } = idSchema.parse(req.params);

            await this.processService.delete(BigInt(id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
