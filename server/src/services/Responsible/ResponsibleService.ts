import { IResponsibleService } from "@/services/Responsible/IResponsibleService";
import { IResponsibleRepository } from "@/repositories/Responsible/IResponsibleRepository";
import { IProcessService } from "@/services/Process/IProcessService";
import { IOrganizationalUnitService } from "@/services/OrganizationalUnit/IOrganizationalUnitService";
import { Responsible } from "@/models/Responsible";
import { NotFoundError, ConflictError } from "@/utils/CustomErrors";

export class ResponsibleService implements IResponsibleService {
    constructor(
        private responsibleRepository: IResponsibleRepository,
        private processService: IProcessService,
        private organizationalUnitService: IOrganizationalUnitService
    ) {}

    private async getProcessOrThrow(processId: bigint): Promise<void> {
        const process = await this.processService.getById(processId);
        if (!process)
            throw new NotFoundError(`O processo com ID ${processId} não foi encontrado.`);
    }

    private async getOrganizationalUnitOrThrow(organizationalUnitId: bigint): Promise<void> {
        const unit = await this.organizationalUnitService.getById(organizationalUnitId);
        if (!unit)
            throw new NotFoundError(`A unidade organizacional com ID ${organizationalUnitId} não foi encontrada.`);
    }

    private async validateUniqueRelation(processId: bigint, organizationalUnitId: bigint): Promise<void> {
        const relation = await this.responsibleRepository.findByProcessAndUnit(processId, organizationalUnitId);
        if (relation)
            throw new ConflictError(`A unidade organizacional ${organizationalUnitId} já está associada ao processo ${processId}.`);
    }

    async getAll(): Promise<Responsible[]> {
        return await this.responsibleRepository.getAll();
    }

    async assign(processId: bigint, organizationalUnitId: bigint): Promise<Responsible> {
        await this.getProcessOrThrow(processId);
        await this.getOrganizationalUnitOrThrow(organizationalUnitId);
        await this.validateUniqueRelation(processId, organizationalUnitId);
        return await this.responsibleRepository.assign(processId, organizationalUnitId);
    }

    async unassign(processId: bigint, organizationalUnitId: bigint): Promise<void> {
        const relation = await this.responsibleRepository.findByProcessAndUnit(processId, organizationalUnitId);
        if (!relation)
            throw new NotFoundError(`Não foi encontrada uma relação entre o processo ${processId} e a unidade organizacional ${organizationalUnitId}.`);
        
        await this.responsibleRepository.unassign(processId, organizationalUnitId);
    }
}
