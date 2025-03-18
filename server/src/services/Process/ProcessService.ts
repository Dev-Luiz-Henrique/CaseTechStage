import {
    IProcessService,
    ProcessBaseData,
} from "@/services/Process/IProcessService";
import { IProcessRepository } from "@/repositories/Process/IProcessRepository";
import { Process } from "@/models/Process";
import { NotFoundError, ConflictError } from "@/utils/CustomErrors";

export class ProcessService implements IProcessService {
    constructor(private processRepository: IProcessRepository) {}

    private async getProcessOrThrow(id: bigint): Promise<Process> {
        const process = await this.processRepository.getById(id);
        if (!process) {
            throw new NotFoundError(`O processo com ID ${id} não foi encontrado. Verifique se o ID está correto.`);
        }
        return process;
    }

    private validateParentRelation(name: string, parentId?: bigint | null, currentId?: bigint): void {
        if (parentId && parentId === currentId)
            throw new ConflictError(`O processo '${name}' não pode ser pai de si mesmo. Escolha um processo diferente como pai.`);
    }

    private async validateParentExists(parentId?: bigint | null): Promise<void> {
        if (parentId)
            await this.getProcessOrThrow(parentId);
    }

    private validateDateRange(startDate?: Date | null, endDate?: Date | null): void {
        if (startDate && endDate && endDate < startDate)
            throw new ConflictError(`A data de término deve ser maior ou igual à data de início.`);
    }

    private async validateParentArea(childAreaId: bigint, parentId?: bigint | null): Promise<void> {
        if (parentId) {
            const parentProcess = await this.getProcessOrThrow(parentId);
            if (parentProcess.areaId !== childAreaId)
                throw new ConflictError(`A área do processo filho deve ser a mesma do processo pai.`);
        }
    }

    private async validateProcess(data: ProcessBaseData, currentId?: bigint): Promise<void> {
        await this.validateParentExists(data.parentId);
        this.validateParentRelation(data.name, data.parentId, currentId ?? data.areaId);
        this.validateDateRange(data.startDate, data.endDate);
        await this.validateParentArea(data.areaId, data.parentId);
    }

    async getAll(): Promise<Process[]> {
        return this.processRepository.getAll();
    }

    async getById(id: bigint): Promise<Process> {
        return this.getProcessOrThrow(id);
    }

    async create(data: ProcessBaseData): Promise<Process> {
        await this.validateProcess(data);
        return this.processRepository.create(data);
    }

    async update(id: bigint, data: Partial<ProcessBaseData>): Promise<Process> {
        const currentProcess = await this.getProcessOrThrow(id);
        const mergedData: ProcessBaseData = { ...currentProcess, ...data };
        await this.validateProcess(mergedData, id);
        return this.processRepository.update(id, data);
    }

    async delete(id: bigint): Promise<void> {
        await this.getProcessOrThrow(id);
        await this.processRepository.delete(id);
    }
}
