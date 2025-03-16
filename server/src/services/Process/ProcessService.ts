import { IProcessService } from "@/services/Process/IProcessService";
import { IProcessRepository } from "@/repositories/Process/IProcessRepository";
import { Process } from "@/models/Process";
import { NotFoundError, ConflictError } from "@/utils/CustomErrors";

export class ProcessService implements IProcessService {
    constructor(private processRepository: IProcessRepository) {}

    private async getProcessOrThrow(id: bigint): Promise<Process> {
        const process = await this.processRepository.getById(id);
        if (!process)
            throw new NotFoundError(`O processo com ID ${id} não foi encontrado. Verifique se o ID está correto.`);
        return process;
    }

    async getAll(): Promise<Process[]> {
        return await this.processRepository.getAll();
    }

    async getById(id: bigint): Promise<Process> {
        return await this.getProcessOrThrow(id);
    }

    async create(data: {
        name: string;
        description?: string;
        documentation?: string;
        tools?: string;
        areaId: bigint;
        parentId?: bigint | null;
    }): Promise<Process> {
        if (data.parentId && data.parentId === data.areaId)
            throw new ConflictError(`O processo '${data.name}' não pode ser pai de si mesmo. Escolha um processo diferente como pai.`);

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
        await this.getProcessOrThrow(id);

        if (data.parentId && data.parentId === id)
            throw new ConflictError(`O processo '${data.name || ""}' não pode ser pai de si mesmo. Escolha um processo diferente como pai.`);

        return await this.processRepository.update(id, data);
    }

    async delete(id: bigint): Promise<void> {
        await this.getProcessOrThrow(id);
        await this.processRepository.delete(id);
    }
}
