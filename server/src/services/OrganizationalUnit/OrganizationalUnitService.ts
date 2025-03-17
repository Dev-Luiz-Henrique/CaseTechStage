import { IOrganizationalUnitService } from "@/services/OrganizationalUnit/IOrganizationalUnitService";
import { IOrganizationalUnitRepository } from "@/repositories/OrganizationalUnit/IOrganizationalUnitRepository";
import { OrganizationalUnit } from "@/models/OrganizationalUnit";
import { NotFoundError, BadRequestError, ConflictError } from "@/utils/CustomErrors";

export class OrganizationalUnitService implements IOrganizationalUnitService {
    constructor(private organizationalUnitRepository: IOrganizationalUnitRepository) {}

    private async getOrganizationalUnitOrThrow(id: bigint): Promise<OrganizationalUnit> {
        const organizationalUnit = await this.organizationalUnitRepository.getById(id);
        if (!organizationalUnit)
            throw new NotFoundError(`A unidade organizacional com ID ${id} não foi encontrada. Verifique se o ID informado está correto.`);
        return organizationalUnit;
    }

    private async validateParent(parentId?: bigint | null, currentId?: bigint | null): Promise<void> {
        if (!parentId) return; 

        const parent = await this.organizationalUnitRepository.getById(parentId);
        if (!parent)
            throw new NotFoundError(`O departamento responsável com ID ${parentId} não foi encontrado.`);
        
        if (parent.parentId != null)
            throw new BadRequestError("Setores só podem pertencer a departamentos. O ID informado não é um departamento válido.");

        if (parent.parentId === currentId)
            throw new ConflictError("Não é possível criar um ciclo hierárquico: o departamento informado já pertence a esta hierarquia.");
    }

    async getAll(): Promise<OrganizationalUnit[]> {
        return await this.organizationalUnitRepository.getAll();
    }

    async getById(id: bigint): Promise<OrganizationalUnit> {
        return this.getOrganizationalUnitOrThrow(id);
    }

    async create(name: string, parentId?: bigint | null): Promise<OrganizationalUnit> {
        if (!parentId)
            return await this.organizationalUnitRepository.create(name, null); // Departamento

        await this.validateParent(parentId);
        return await this.organizationalUnitRepository.create(name, parentId); // Setor
    }

    async update(id: bigint, name?: string, parentId?: bigint | null): Promise<OrganizationalUnit> {
        const organizationalUnit = await this.getOrganizationalUnitOrThrow(id);
        const isDepartment = organizationalUnit.parentId == null;  

        if (isDepartment && parentId)
            throw new ConflictError("Não é possível transformar um departamento em setor. Crie um setor separadamente.");

        if (!isDepartment && parentId === null) 
            throw new ConflictError("Setores não podem virar departamentos. Sempre precisam estar vinculados a um departamento.");

        await this.validateParent(parentId, id);
        return await this.organizationalUnitRepository.update(id, name, parentId);
    }

    async delete(id: bigint): Promise<void> {
        await this.getOrganizationalUnitOrThrow(id);
        await this.organizationalUnitRepository.delete(id);
    }
}
