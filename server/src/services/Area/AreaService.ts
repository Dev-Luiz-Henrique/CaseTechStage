import { IAreaService } from "@/services/Area/IAreaService";
import { IAreaRepository } from "@/repositories/Area/IAreaRepository";
import { Area } from "@/models/Area";

export class AreaService implements IAreaService {
    constructor(private areaRepository: IAreaRepository) {}

    private async getAreaOrThrow(id: bigint): Promise<Area> {
        const area = await this.areaRepository.getById(id);
        if (!area)
            throw new Error(`Nenhuma área encontrada com o ID ${id}. Verifique se o ID está correto.`);
        return area;
    }

    private async validateAreaName(name: string): Promise<void> {
        const exists = await this.areaRepository.getByName(name);
        if (exists)
            throw new Error(`Já existe uma área cadastrada com o nome '${name}'. Escolha um nome diferente.`);
    }

    async getAll(): Promise<Area[]> {
        return await this.areaRepository.getAll();
    }

    async getById(id: bigint): Promise<Area> {
        return await this.getAreaOrThrow(id);
    }

    async create(name: string): Promise<Area> {
        await this.validateAreaName(name);
        return await this.areaRepository.create(name);
    }

    async update(id: bigint, name: string): Promise<Area> {
        await this.getAreaOrThrow(id);
        await this.validateAreaName(name);
        return await this.areaRepository.update(id, name);
    }

    async delete(id: bigint): Promise<void> {
        await this.getAreaOrThrow(id);
        await this.areaRepository.delete(id);
    }
}
