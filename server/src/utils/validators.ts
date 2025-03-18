import { PROCESS_PRIORITY_VALUES, PROCESS_STATUS_VALUES, PROCESS_TYPE_VALUES } from "@/models/Process";
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
    name: z.string().trim().min(3, "O nome da área deve ter no mínimo 3 caracteres.")
        .max(255, "O nome da área não pode exceder 255 caracteres."),
  });

  export const organizationalUnitSchema = z.object({
    name: z.string().trim().min(3, "O nome da unidade organizacional deve ter no mínimo 3 caracteres.")
        .max(255, "O nome da unidade organizacional não pode exceder 255 caracteres."),
    parentId: idSchema.shape.id.nullable().optional(),
  });

export const processSchema = z.object({
    name: z.string().trim().min(3, "O nome do processo deve ter pelo menos 3 caracteres.")
        .max(255, "O nome do processo não pode exceder 255 caracteres."),
    description: z.string().optional().nullable(),
    documentation: z.string().optional().nullable(),
    tools: z.string().optional().nullable(),
    areaId: idSchema.shape.id,
    parentId: idSchema.shape.id.optional().nullable(),
    status: z.enum(PROCESS_STATUS_VALUES).default("Planejado"),
    priority: z.enum(PROCESS_PRIORITY_VALUES).default("Media"),
    type: z.enum(PROCESS_TYPE_VALUES).default("Manual"),
    startDate: z.string().optional().nullable(), 
    endDate: z.string().optional().nullable()
});

export const responsibleSchema = z.object({
    processId: idSchema.shape.id,
    organizationalUnitId: idSchema.shape.id
});
