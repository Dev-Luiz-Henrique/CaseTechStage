import { RequestHandler } from "express";
import { IAreaService } from "@/services/Area/IAreaService";
import { idSchema, areaSchema } from "@/utils/validators";

/**
 * @swagger
 * tags:
 *   name: Areas
 *   description: Categorias ou divisões que agrupam processos.
 */
export class AreaController {
    constructor(private areaService: IAreaService) {}
    
    /**
     * @swagger
     * /areas:
     *   get:
     *     summary: Retorna todas as áreas
     *     tags: [Areas]
     *     responses:
     *       200:
     *         description: Lista de áreas retornada com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: string
     *                     example: "1"
     *                   name:
     *                     type: string
     *                     example: "Área 1"
     */
    getAll: RequestHandler = async (req, res, next) => {
        try {
            const areas = await this.areaService.getAll();
            res.status(200).json(areas);
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /areas/{id}:
     *   get:
     *     summary: Retorna uma área pelo ID
     *     tags: [Areas]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Área encontrada
     *       404:
     *         description: Área não encontrada
     */
    getById: RequestHandler = async (req, res, next) => {
        try {
            const { id } = idSchema.parse(req.params);

            const area = await this.areaService.getById(BigInt(id));
            res.status(200).json(area);
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /areas:
     *   post:
     *     summary: Cria uma nova área
     *     tags: [Areas]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Nova Área"
     *     responses:
     *       201:
     *         description: Área criada com sucesso
     *       409:
     *         description: Conflito - Nome já existe
     */
    create: RequestHandler = async (req, res, next) => {
        try {
            const { name } = areaSchema.parse(req.body);

            const newArea = await this.areaService.create(name);
            res.status(201).json(newArea);
        } catch (error) {
            next(error);
        }
    };


    /**
    * @swagger
    * /areas/{id}:
    *   put:
    *     summary: Atualiza uma área existente
    *     tags: [Areas]
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: string
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               name:
    *                 type: string
    *                 example: "Área Atualizada"
    *     responses:
    *       200:
    *         description: Área atualizada com sucesso
    *       404:
    *         description: Área não encontrada
    *       409:
    *         description: Conflito - Nome já existe
    */
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

    /**
    * @swagger
    * /areas/{id}:
    *   delete:
    *     summary: Remove uma área pelo ID
    *     tags: [Areas]
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: string
    *     responses:
    *       204:
    *         description: Área removida com sucesso
    *       404:
    *         description: Área não encontrada
    */
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
