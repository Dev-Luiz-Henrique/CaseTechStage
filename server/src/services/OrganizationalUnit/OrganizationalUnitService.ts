import { IOrganizationalUnitService } from "@/services/OrganizationalUnit/IOrganizationalUnitService";
import { IOrganizationalUnitRepository } from "@/repositories/OrganizationalUnit/IOrganizationalUnitRepository";
import { OrganizationalUnit } from "@/models/OrganizationalUnit";

export class OrganizationalUnitService implements IOrganizationalUnitService {
    constructor(private organizationalUnitRepository: IOrganizationalUnitRepository) {}

    async getAll(): Promise<OrganizationalUnit[]> {
        return await this.organizationalUnitRepository.getAll();
    }

    async getById(id: bigint): Promise<OrganizationalUnit | null> {
        return await this.organizationalUnitRepository.getById(id);
    }

    async create(name: string, parentId?: bigint | null): Promise<OrganizationalUnit> {
        return await this.organizationalUnitRepository.create(name, parentId);
    }

    async update(id: bigint, name?: string, parentId?: bigint | null): Promise<OrganizationalUnit> {
        return await this.organizationalUnitRepository.update(id, name, parentId);
    }

    async delete(id: bigint): Promise<void> {
        await this.organizationalUnitRepository.delete(id);
    }
}
