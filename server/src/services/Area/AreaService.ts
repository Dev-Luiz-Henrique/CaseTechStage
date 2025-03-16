import { IAreaService } from "@/services/Area/IAreaService";
import { IAreaRepository } from "@/repositories/Area/IAreaRepository";
import { Area } from "@/models/Area";

export class AreaService implements IAreaService {
    constructor(private areaRepository: IAreaRepository) {}

    async getAll(): Promise<Area[]> {
        return await this.areaRepository.getAll();
    }

    async getById(id: bigint): Promise<Area | null> {
        return await this.areaRepository.getById(id);
    }

    async create(name: string): Promise<Area> {
        return await this.areaRepository.create(name);
    }

    async update(id: bigint, name: string): Promise<Area> {
        return await this.areaRepository.update(id, name);
    }

    async delete(id: bigint): Promise<void> {
        await this.areaRepository.delete(id);
    }
}