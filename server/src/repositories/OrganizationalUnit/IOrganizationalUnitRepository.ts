import { OrganizationalUnit } from "@/models/OrganizationalUnit";

export interface IOrganizationalUnitRepository {

    getAll(): Promise<OrganizationalUnit[]>;

    getById(id: bigint): Promise<OrganizationalUnit | null>;

    create(name: string, parentId?: bigint | null): Promise<OrganizationalUnit>;

    update(id: bigint, name?: string, parentId?: bigint | null): Promise<OrganizationalUnit>;
    
    delete(id: bigint): Promise<void>;
}
