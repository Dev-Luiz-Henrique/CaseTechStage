import { RequestHandler } from "express";
import { IOrganizationalUnitService } from "@/services/OrganizationalUnit/IOrganizationalUnitService";
import { idSchema, organizationalUnitSchema } from "@/utils/validators";

/**
 * @swagger
 * tags:
 *   name: Organizational Units
 *   description: Estruturas internas que representam departamentos ou setores.
 */
export class OrganizationalUnitController {
    constructor(private organizationalUnitService: IOrganizationalUnitService) {}

    /**
     * @swagger
     * /organizational-units:
     *   get:
     *     summary: Retorna todas as unidades organizacionais
     *     tags: [Organizational Units]
     *     responses:
     *       200:
     *         description: Lista de unidades organizacionais
     */
    getAll: RequestHandler = async (req, res, next) => {
        try {
            const units = await this.organizationalUnitService.getAll();
            res.status(200).json(units);
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /organizational-units/{id}:
     *   get:
     *     summary: Retorna uma unidade organizacional pelo ID
     *     tags: [Organizational Units]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Unidade organizacional encontrada
     */
    getById: RequestHandler = async (req, res, next) => {
        try {
            const { id } = idSchema.parse(req.params);
            
            const unit = await this.organizationalUnitService.getById(BigInt(id));
            res.status(200).json(unit);
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /organizational-units:
     *   post:
     *     summary: Cria uma nova unidade organizacional
     *     tags: [Organizational Units]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               parentId:
     *                 type: string
     *                 nullable: true
     *     responses:
     *       201:
     *         description: Unidade organizacional criada com sucesso
     */
    create: RequestHandler = async (req, res, next) => {
        try {
            const { name, parentId } = organizationalUnitSchema.parse(req.body);

            const newUnit = await this.organizationalUnitService.create(name, parentId ? BigInt(parentId) : null);
            res.status(201).json(newUnit);
        } catch (error) {
            next(error);
        }
    };

    /**
     * @swagger
     * /organizational-units/{id}:
     *   put:
     *     summary: Atualiza uma unidade organizacional
     *     tags: [Organizational Units]
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
     *               parentId:
     *                 type: string
     *                 nullable: true
     *     responses:
     *       200:
     *         description: Unidade organizacional atualizada com sucesso
     */
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

     /**
     * @swagger
     * /organizational-units/{id}:
     *   delete:
     *     summary: Remove uma unidade organizacional pelo ID
     *     tags: [Organizational Units]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Unidade organizacional removida com sucesso
     */
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
