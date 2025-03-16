import { IResponsibleService } from "@/services/Responsible/IResponsibleService";
import { IResponsibleRepository } from "@/repositories/Responsible/IResponsibleRepository";
import { Responsible } from "@/models/Responsible";

export class ResponsibleService implements IResponsibleService {
    constructor(private responsibleRepository: IResponsibleRepository) {}

    async getAll(): Promise<Responsible[]> {
        return await this.responsibleRepository.getAll();
    }

    async assign(processId: bigint, organizationalUnitId: bigint): Promise<Responsible> {
        return await this.responsibleRepository.assign(processId, organizationalUnitId);
    }

    async unassign(processId: bigint, organizationalUnitId: bigint): Promise<void> {
        await this.responsibleRepository.unassign(processId, organizationalUnitId);
    }
}
