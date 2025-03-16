import { PrismaClient, Process as PrismaProcess } from "@prisma/client";
import { IProcessRepository } from "@/repositories/Process/IProcessRepository";
import { Process } from "@/models/Process";

const prisma = new PrismaClient();

const mapToProcess = (proc: PrismaProcess): Process =>
    new Process(
        proc.id,
        proc.name,
        proc.areaId,
        proc.description ?? undefined,
        proc.documentation ?? undefined,
        proc.tools ?? undefined,
        proc.parentId ?? undefined,
        proc.createdAt ?? undefined
    );

export class PrismaProcessRepository implements IProcessRepository {
    
    async getAll(): Promise<Process[]> {
        const processes: PrismaProcess[] = await prisma.process.findMany();
        return processes.map(mapToProcess);
    }

    async getById(id: bigint): Promise<Process | null> {
        const proc: PrismaProcess | null = await prisma.process.findUnique({ where: { id } });
        return proc ? mapToProcess(proc) : null;
    }

    async create(data: {
        name: string;
        description?: string | null;
        documentation?: string | null;
        tools?: string | null;
        areaId: bigint;
        parentId?: bigint | null;
    }): Promise<Process> {
        const newProc: PrismaProcess = await prisma.process.create({ data });
        return mapToProcess(newProc);
    }

    async update(id: bigint, data: {
        name?: string;
        description?: string | null;
        documentation?: string | null;
        tools?: string | null;
        areaId?: bigint;
        parentId?: bigint | null;
    }): Promise<Process> {
        const updatedProc: PrismaProcess = await prisma.process.update({
            where: { id },
            data
        });
        return mapToProcess(updatedProc);
    }

    async delete(id: bigint): Promise<void> {
        await prisma.process.delete({ where: { id } });
    }
}
