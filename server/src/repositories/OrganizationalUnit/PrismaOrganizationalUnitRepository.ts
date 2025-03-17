import { PrismaClient, OrganizationalUnit as PrismaOrganizationalUnit } from "@prisma/client";
import { IOrganizationalUnitRepository } from "@/repositories/OrganizationalUnit/IOrganizationalUnitRepository";
import { OrganizationalUnit } from "@/models/OrganizationalUnit";

const prisma = new PrismaClient();

const mapToOrganizationalUnit = (unit: PrismaOrganizationalUnit): OrganizationalUnit =>
    new OrganizationalUnit(
        unit.id,
        unit.name,
        unit.parentId ?? undefined,
        unit.createdAt ?? undefined
    );

export class PrismaOrganizationalUnitRepository implements IOrganizationalUnitRepository {
    
    async getAll(): Promise<OrganizationalUnit[]> {
        const units = await prisma.organizationalUnit.findMany({
            include: { parent: true }
        });
        return units.map(unit => {
            const enrichedUnit = mapToOrganizationalUnit(unit);
            if (unit.parent) 
                (enrichedUnit as any).parentName = unit.parent.name;
    
            return enrichedUnit;
        });
    }
    

    async getById(id: bigint): Promise<OrganizationalUnit | null> {
        const unit = await prisma.organizationalUnit.findUnique({ where: { id } });
        return unit ? mapToOrganizationalUnit(unit) : null;
    }

    async create(name: string, parentId?: bigint | null): Promise<OrganizationalUnit> {
        const newUnit = await prisma.organizationalUnit.create({
            data: { name, parentId }
        });
        return mapToOrganizationalUnit(newUnit);
    }

    async update(id: bigint, name?: string, parentId?: bigint | null): Promise<OrganizationalUnit> {
        const updatedUnit = await prisma.organizationalUnit.update({
            where: { id },
            data: { name, parentId }
        });
        return mapToOrganizationalUnit(updatedUnit);
    }

    async delete(id: bigint): Promise<void> {
        await prisma.organizationalUnit.delete({ where: { id } });
    }
}
