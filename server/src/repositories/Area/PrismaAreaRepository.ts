import { PrismaClient } from "@prisma/client";
import { IAreaRepository } from "@/repositories/Area/IAreaRepository";
import { Area } from "@/models/Area";

const prisma = new PrismaClient();

export class PrismaAreaRepository implements IAreaRepository {
    
    private mapToArea(area: {
        id: bigint;
        name: string;
        createdAt?: Date | null;
    }): Area {
        return new Area(
            area.id,
            area.name,
            area.createdAt ?? undefined
        );
    }

    async getAll(): Promise<Area[]> {
        const areas = await prisma.area.findMany();
        return areas.map(area => this.mapToArea(area));
    }

    async getById(id: bigint): Promise<Area | null> {
        const area = await prisma.area.findUnique({ where: { id } });
        return area ? this.mapToArea(area) : null;
    }

    async create(name: string): Promise<Area> {
        const newArea = await prisma.area.create({ data: { name } });
        return this.mapToArea(newArea);
    }

    async update(id: bigint, name: string): Promise<Area> {
        const updatedArea = await prisma.area.update({
            where: { id },
            data: { name }
        });
        return this.mapToArea(updatedArea);
    }

    async delete(id: bigint): Promise<void> {
        await prisma.area.delete({ where: { id } });
    }
}
