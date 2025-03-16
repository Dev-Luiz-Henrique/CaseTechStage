import { PrismaClient, Responsible as PrismaResponsible } from "@prisma/client";
import { IResponsibleRepository } from "@/repositories/Responsible/IResponsibleRepository";
import { Responsible } from "@/models/Responsible";

const prisma = new PrismaClient();

const mapToResponsible = (responsible: PrismaResponsible): Responsible =>
    new Responsible(
        responsible.processId,
        responsible.organizationalUnitId,
        responsible.createdAt ?? undefined
    );

export class PrismaResponsibleRepository implements IResponsibleRepository {
    
    async getAll(): Promise<Responsible[]> {
        const responsibles = await prisma.responsible.findMany();
        return responsibles.map(mapToResponsible);
    }

    async assign(processId: bigint, organizationalUnitId: bigint): Promise<Responsible> {
        const newResponsible = await prisma.responsible.create({
            data: { processId, organizationalUnitId }
        });
        return mapToResponsible(newResponsible);
    }

    async unassign(processId: bigint, organizationalUnitId: bigint): Promise<void> {
        await prisma.responsible.delete({
            where: { processId_organizationalUnitId: { processId, organizationalUnitId } }
        });
    }

    async findByProcessAndUnit(processId: bigint, organizationalUnitId: bigint): Promise<Responsible | null> {
        const responsible = await prisma.responsible.findUnique({
            where: { processId_organizationalUnitId: { processId, organizationalUnitId } }
        });
        return responsible ? mapToResponsible(responsible) : null;
    }
}
