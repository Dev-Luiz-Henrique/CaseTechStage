import { RequestHandler } from "express";
import { IResponsibleService } from "@/services/Responsible/IResponsibleService";
import { responsibleSchema } from "@/utils/validators";

export class ResponsibleController {
    constructor(private responsibleService: IResponsibleService) {}

    getAll: RequestHandler = async (req, res, next) => {
        try {
            const responsibles = await this.responsibleService.getAll();
            res.status(200).json(responsibles);
        } catch (error) {
            next(error);
        }
    };

    assign: RequestHandler = async (req, res, next) => {
        try {
            const { processId, organizationalUnitId } = responsibleSchema.parse(req.body);

            const responsible = await this.responsibleService.assign(BigInt(processId), BigInt(organizationalUnitId));
            res.status(201).json(responsible);
        } catch (error) {
            next(error);
        }
    };

    unassign: RequestHandler = async (req, res, next) => {
        try {
            const { processId, organizationalUnitId } = responsibleSchema.parse(req.body);

            await this.responsibleService.unassign(BigInt(processId), BigInt(organizationalUnitId));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}
