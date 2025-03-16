import { PrismaClient } from "@prisma/client";
import { IAreaRepository } from "@/repositories/Area/IAreaRepository";
import { Area } from "@/models/Area";

const prisma = new PrismaClient();

const mapToArea = (area: any): Area =>
    new Area(
        area.id,
        area.name,
        area.createdAt ?? undefined
    );

export class PrismaAreaRepository implements IAreaRepository {
    
    async getAll(): Promise<Area[]> {
        const areas = await prisma.area.findMany();
        return areas.map(mapToArea);
    }

    async getById(id: bigint): Promise<Area | null> {
        const area = await prisma.area.findUnique({ where: { id } });
        return area ? mapToArea(area) : null;
    }

    async create(name: string): Promise<Area> {
        const newArea = await prisma.area.create({ data: { name } });
        return mapToArea(newArea);
    }

    async update(id: bigint, name: string): Promise<Area> {
        const updatedArea = await prisma.area.update({
            where: { id },
            data: { name }
        });
        return mapToArea(updatedArea);
    }

    async delete(id: bigint): Promise<void> {
        await prisma.area.delete({ where: { id } });
    }

    async getByName(name: string): Promise<Area | null> {
        const area = await prisma.area.findFirst({ where: { name } });
        return area ? mapToArea(area) : null;
    }
}
