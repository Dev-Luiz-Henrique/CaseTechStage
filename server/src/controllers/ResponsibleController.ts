import { RequestHandler } from "express";
import { IResponsibleService } from "@/services/Responsible/IResponsibleService";
import { responsibleSchema } from "@/utils/validators";

/**
 * @swagger
 * tags:
 *   - name: Responsibles
 *     description: Associação entre processos e unidades organizacionais, definindo quem é responsável pelo acompanhamento e execução das atividades.
 */
export class ResponsibleController {
    constructor(private responsibleService: IResponsibleService) {}

    /**
     * @swagger
     * /responsibles:
     *   get:
     *     summary: Recuperar todos os responsáveis
     *     tags: [Responsibles]
     *     description: Obtém uma lista de todas as associações de responsáveis
     *     responses:
     *       200:
     *         description: Lista de responsáveis retornada com sucesso
     */
    getAll: RequestHandler = async (req, res, next) => {
        try {
            const responsibles = await this.responsibleService.getAll();
            res.status(200).json(responsibles);
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /responsibles/assign:
     *   post:
     *     summary: Atribuir um responsável a um processo
     *     tags: [Responsibles]
     *     description: Associa um responsável a um processo e a uma unidade organizacional
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               processId:
     *                 type: string
     *               organizationalUnitId:
     *                 type: string
     *     responses:
     *       201:
     *         description: Responsável atribuído com sucesso
     */
    assign: RequestHandler = async (req, res, next) => {
        try {
            const { processId, organizationalUnitId } = responsibleSchema.parse(req.body);

            const responsible = await this.responsibleService.assign(BigInt(processId), BigInt(organizationalUnitId));
            res.status(201).json(responsible);
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /responsibles/unassign:
     *   post:
     *     summary: Remover um responsável de um processo
     *     tags: [Responsibles]
     *     description: Remove a associação de um responsável a um processo e a uma unidade organizacional
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               processId:
     *                 type: string
     *               organizationalUnitId:
     *                 type: string
     *     responses:
     *       204:
     *         description: Responsável removido com sucesso
     */
    unassign: RequestHandler = async (req, res, next) => {
        try {
            const { processId, organizationalUnitId } = responsibleSchema.parse(req.body);

            await this.responsibleService.unassign(BigInt(processId), BigInt(organizationalUnitId));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /responsibles/{processId}/{organizationalUnitId}:
     *   get:
     *     summary: Obter um responsável por processo e unidade organizacional
     *     tags: [Responsibles]
     *     description: Recupera um responsável específico por ID do processo e ID da unidade organizacional
     *     parameters:
     *       - in: path
     *         name: processId
     *         required: true
     *         schema:
     *           type: string
     *       - in: path
     *         name: organizationalUnitId
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Responsável encontrado
     *       404:
     *         description: Responsável não encontrado
     */
    getByProcessAndUnit: RequestHandler = async (req, res, next) => {
        try {
            const { processId, organizationalUnitId } = req.params;
            const responsible = await this.responsibleService.getByProcessAndUnit(
                BigInt(processId), BigInt(organizationalUnitId)
            );
            res.status(200).json(responsible);
        } catch (error) {
            next(error);
        }
    };
}
