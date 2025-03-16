import { IResponsibleService } from "@/services/Responsible/IResponsibleService";
import { IResponsibleRepository } from "@/repositories/Responsible/IResponsibleRepository";
import { IProcessService } from "@/services/Process/IProcessService";
import { IOrganizationalUnitService } from "@/services/OrganizationalUnit/IOrganizationalUnitService";
import { Responsible } from "@/models/Responsible";

export class ResponsibleService implements IResponsibleService {
    constructor(
        private responsibleRepository: IResponsibleRepository,
        private processService: IProcessService,
        private organizationalUnitService: IOrganizationalUnitService
    ) {}

    private async getProcessOrThrow(processId: bigint): Promise<void> {
        if (!(await this.processService.getById(processId)))
            throw new Error(`O processo com ID ${processId} não foi encontrado.`);
    }

    private async getOrganizationalUnitOrThrow(organizationalUnitId: bigint): Promise<void> {
        if (!(await this.organizationalUnitService.getById(organizationalUnitId)))
            throw new Error(`A unidade organizacional com ID ${organizationalUnitId} não foi encontrada.`);
    }

    private async validateUniqueRelation(processId: bigint, organizationalUnitId: bigint): Promise<void> {
        if (await this.responsibleRepository.findByProcessAndUnit(processId, organizationalUnitId))
            throw new Error(`A unidade organizacional ${organizationalUnitId} já está associada ao processo ${processId}.`);
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
        if (!(await this.responsibleRepository.findByProcessAndUnit(processId, organizationalUnitId)))
            throw new Error(`Não foi encontrada uma relação entre o processo ${processId} 
                e a unidade organizacional ${organizationalUnitId}.`);
        
        await this.responsibleRepository.unassign(processId, organizationalUnitId);
    }
}
