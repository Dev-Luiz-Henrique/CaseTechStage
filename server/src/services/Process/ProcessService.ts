import { IProcessService } from "@/services/Process/IProcessService";
import { IProcessRepository } from "@/repositories/Process/IProcessRepository";
import { Process } from "@/models/Process";

export class ProcessService implements IProcessService {
    constructor(private processRepository: IProcessRepository) {}

    async getAll(): Promise<Process[]> {
        return await this.processRepository.getAll();
    }

    async getById(id: bigint): Promise<Process | null> {
        return await this.processRepository.getById(id);
    }

    async create(data: {
        name: string;
        description?: string;
        documentation?: string;
        tools?: string;
        areaId: bigint;
        parentId?: bigint | null;
    }): Promise<Process> {
        return await this.processRepository.create(data);
    }

    async update(id: bigint, data: {
        name?: string;
        description?: string;
        documentation?: string;
        tools?: string;
        areaId?: bigint;
        parentId?: bigint | null;
    }): Promise<Process> {
        return await this.processRepository.update(id, data);
    }

    async delete(id: bigint): Promise<void> {
        await this.processRepository.delete(id);
    }
}
