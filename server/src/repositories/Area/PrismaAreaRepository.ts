import { PrismaClient } from "@prisma/client";
import { IAreaRepository } from "@/repositories/Area/IAreaRepository";
import { Area } from "@/models/Area";

const prisma = new PrismaClient();

export class PrismaAreaRepository implements IAreaRepository {

    async getAll(): Promise<Area[]> {
        const areas = await prisma.areas.findMany();
        return areas.map(area => new Area(area.id, area.name, area.created_at ?? undefined));
    }

    async getById(id: number): Promise<Area | null> {
        const area = await prisma.areas.findUnique({ where: { id } });
        return area ? new Area(area.id, area.name, area.created_at ?? undefined) : null;
    }

    async create(name: string): Promise<Area> {
        const newArea = await prisma.areas.create({ data: { name } });
        return new Area(newArea.id, newArea.name, newArea.created_at ?? undefined);
    }

    async update(id: number, name: string): Promise<Area> {
        const updatedArea = await prisma.areas.update({
            where: { id },
            data: { name }
        });
        return new Area(updatedArea.id, updatedArea.name, updatedArea.created_at ?? undefined);
    }

    async delete(id: number): Promise<void> {
        await prisma.areas.delete({ where: { id } });
    }
}
