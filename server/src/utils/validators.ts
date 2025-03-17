import { z } from "zod";

export const idSchema = z.object({
    id: z.union([
        z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "ID inválido. Deve ser um número inteiro positivo.",
        }),
        z.number().int().positive("ID inválido. Deve ser um número inteiro positivo."),
    ]),
});

export const areaSchema = z.object({
    name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres.").max(255, "Nome muito longo."),
});

export const organizationalUnitSchema = z.object({
    name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres.").max(255, "Nome muito longo."),
    parentId: idSchema.shape.id.optional().nullable(),
});

export const processSchema = z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres.").max(255, "Nome muito longo."),
    description: z.string().optional(),
    documentation: z.string().optional(),
    tools: z.string().optional(),
    areaId: idSchema.shape.id,
    parentId: idSchema.shape.id.optional().nullable(),
    status: z.enum(["Ativo", "Em Desenvolvimento", "Descontinuado"]).optional(),
    priority: z.enum(["Alta", "Media", "Baixa"]).optional(),
    type: z.enum(["Sistemico", "Manual"]).optional(),
    startDate: z.string().optional(), 
    endDate: z.string().optional()
});

export const responsibleSchema = z.object({
    processId: idSchema.shape.id,
    organizationalUnitId: idSchema.shape.id
});
