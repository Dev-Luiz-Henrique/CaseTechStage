import { IOrganizationalUnitService } from "@/services/OrganizationalUnit/IOrganizationalUnitService";
import { IOrganizationalUnitRepository } from "@/repositories/OrganizationalUnit/IOrganizationalUnitRepository";
import { OrganizationalUnit } from "@/models/OrganizationalUnit";

export class OrganizationalUnitService implements IOrganizationalUnitService {
    constructor(private organizationalUnitRepository: IOrganizationalUnitRepository) {}

    private async getOrganizationalUnitOrThrow(id: bigint): Promise<OrganizationalUnit> {
        const organizationalUnit = await this.organizationalUnitRepository.getById(id);
        if (!organizationalUnit)
            throw new Error(`A unidade organizacional com ID ${id} não foi encontrada. Verifique se o ID informado está correto.`);
        return organizationalUnit;
    }

    private async validateParent(parentId: bigint, currentId: bigint | null): Promise<void> {
        if (parentId === currentId)
            throw new Error("A unidade organizacional não pode ser seu próprio responsável. Escolha um responsável diferente.");

        const parent = await this.organizationalUnitRepository.getById(parentId);
        if (!parent)
            throw new Error(`O departamento responsável com ID ${parentId} não foi encontrado. Confirme se ele existe antes de atribuí-lo.`);

        if (parent.parentId === currentId)
            throw new Error("Não é possível criar um ciclo hierárquico: o departamento informado já pertence a esta hierarquia.");

        if (parent.parentId)
            throw new Error("Setores não podem ser responsáveis por outros setores ou departamentos. Verifique as regras de atribuição.");
    }

    async getAll(): Promise<OrganizationalUnit[]> {
        return await this.organizationalUnitRepository.getAll();
    }

    async getById(id: bigint): Promise<OrganizationalUnit> {
        return this.getOrganizationalUnitOrThrow(id);
    }

    async create(name: string, parentId?: bigint | null): Promise<OrganizationalUnit> {
        if (parentId) 
            await this.validateParent(parentId, null);

        return await this.organizationalUnitRepository.create(name, parentId);
    }

    async update(id: bigint, name?: string, parentId?: bigint | null): Promise<OrganizationalUnit> {
        const unit = await this.getOrganizationalUnitOrThrow(id);

        if (parentId)
            await this.validateParent(parentId, id);

        return await this.organizationalUnitRepository.update(id, name, parentId);
    }

    async delete(id: bigint): Promise<void> {
        await this.getOrganizationalUnitOrThrow(id);
        await this.organizationalUnitRepository.delete(id);
    }
}
