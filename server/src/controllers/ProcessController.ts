import { RequestHandler } from "express";
import { IProcessService } from "@/services/Process/IProcessService";
import { idSchema, processSchema } from "@/utils/validators";

/**
 * @swagger
 * tags:
 *   name: Processes
 *   description: Gerenciamento de Processos
 */
export class ProcessController {
    constructor(private processService: IProcessService) {}

    /**
     * @swagger
     * /processes:
     *   get:
     *     summary: Retorna todos os processos
     *     tags: [Processes]
     *     responses:
     *       200:
     *         description: Lista de processos
     */
    getAll: RequestHandler = async (req, res, next) => {
        try {
            const processes = await this.processService.getAll();
            res.status(200).json(processes);
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /processes/{id}:
     *   get:
     *     summary: Retorna um processo específico pelo ID
     *     tags: [Processes]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do processo
     *     responses:
     *       200:
     *         description: Dados do processo
     *       404:
     *         description: Processo não encontrado
     */
    getById: RequestHandler = async (req, res, next) => {
        try {
            const { id } = idSchema.parse(req.params);
            const process = await this.processService.getById(BigInt(id));
            res.status(200).json(process);
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /processes:
     *   post:
     *     summary: Cria um novo processo
     *     tags: [Processes]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Process'
     *     responses:
     *       201:
     *         description: Processo criado com sucesso
     */
    create: RequestHandler = async (req, res, next) => {
        try {
            const validatedData = processSchema.parse(req.body);
            
            const newProcess = await this.processService.create({
                ...validatedData,
                areaId: BigInt(validatedData.areaId),
                parentId: validatedData.parentId ? BigInt(validatedData.parentId) : null,
                startDate: validatedData.startDate ? new Date(validatedData.startDate) : undefined,
                endDate: validatedData.endDate ? new Date(validatedData.endDate) : undefined
            });
            res.status(201).json(newProcess);
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /processes/{id}:
     *   put:
     *     summary: Atualiza um processo existente
     *     tags: [Processes]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do processo
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Process'
     *     responses:
     *       200:
     *         description: Processo atualizado com sucesso
     */
    update: RequestHandler = async (req, res, next) => {
        try {
            const { id } = idSchema.parse(req.params);
            const validatedData = processSchema.partial().parse(req.body);
            
            const updatedProcess = await this.processService.update(BigInt(id), {
                ...validatedData,
                areaId: validatedData.areaId ? BigInt(validatedData.areaId) : undefined,
                parentId: validatedData.parentId ? BigInt(validatedData.parentId) : undefined,
                startDate: validatedData.startDate ? new Date(validatedData.startDate) : undefined,
                endDate: validatedData.endDate ? new Date(validatedData.endDate) : undefined
            });
            res.status(200).json(updatedProcess);
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /processes/{id}:
     *   delete:
     *     summary: Deleta um processo
     *     tags: [Processes]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: ID do processo
     *     responses:
     *       204:
     *         description: Processo deletado com sucesso
     */
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
