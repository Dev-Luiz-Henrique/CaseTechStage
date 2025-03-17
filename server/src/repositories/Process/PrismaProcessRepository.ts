import {
    PrismaClient,
    Process as PrismaProcess,
    process_status,
    process_priority,
    process_type,
} from "@prisma/client";
import { IProcessRepository } from "@/repositories/Process/IProcessRepository";
import {
    Process,
    ProcessStatus,
    ProcessPriority,
    ProcessType,
} from "@/models/Process";

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
        proc.status as ProcessStatus,
        proc.priority as ProcessPriority,
        proc.type as ProcessType,
        proc.startDate ?? undefined,
        proc.endDate ?? undefined,
        proc.createdAt ?? undefined
    );

const convertStatus = (status?: ProcessStatus): process_status | undefined => status as process_status;
const convertPriority = (priority?: ProcessPriority): process_priority | undefined => priority as process_priority;
const convertType = (type?: ProcessType): process_type | undefined => type as process_type;

export class PrismaProcessRepository implements IProcessRepository {
    async getAll(): Promise<Process[]> {
        const processes: PrismaProcess[] = await prisma.process.findMany();
        return processes.map(mapToProcess);
    }

    async getById(id: bigint): Promise<Process | null> {
        const proc: PrismaProcess | null = await prisma.process.findUnique({
            where: { id },
        });
        return proc ? mapToProcess(proc) : null;
    }

    async create(data: {
        name: string;
        description?: string | null;
        documentation?: string | null;
        tools?: string | null;
        areaId: bigint;
        parentId?: bigint | null;
        status?: ProcessStatus;
        priority?: ProcessPriority;
        type?: ProcessType;
        startDate?: Date;
        endDate?: Date;
    }): Promise<Process> {
        const newProc: PrismaProcess = await prisma.process.create({
            data: {
                name: data.name,
                description: data.description ?? null,
                documentation: data.documentation ?? null,
                tools: data.tools ?? null,
                areaId: data.areaId,
                parentId: data.parentId ?? null,
                status: convertStatus(data.status),
                priority: convertPriority(data.priority),
                type: convertType(data.type),
                startDate: data.startDate,
                endDate: data.endDate,
            },
        });
        return mapToProcess(newProc);
    }

    async update(
        id: bigint,
        data: {
            name?: string;
            description?: string | null;
            documentation?: string | null;
            tools?: string | null;
            areaId?: bigint;
            parentId?: bigint | null;
            status?: ProcessStatus;
            priority?: ProcessPriority;
            type?: ProcessType;
            startDate?: Date;
            endDate?: Date;
        }
    ): Promise<Process> {
        const updatedProc: PrismaProcess = await prisma.process.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description ?? null,
                documentation: data.documentation ?? null,
                tools: data.tools ?? null,
                areaId: data.areaId,
                parentId: data.parentId ?? null,
                status: convertStatus(data.status),
                priority: convertPriority(data.priority),
                type: convertType(data.type),
                startDate: data.startDate,
                endDate: data.endDate,
            },
        });
        return mapToProcess(updatedProc);
    }

    async delete(id: bigint): Promise<void> {
        await prisma.process.delete({ where: { id } });
    }
}
