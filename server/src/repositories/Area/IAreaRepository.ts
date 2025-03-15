import { Area } from "@/models/Area";

export interface IAreaRepository {
    getAll(): Promise<Area[]>;
    getById(id: number): Promise<Area | null>;
    create(name: string): Promise<Area>;
    update(id: number, name: string): Promise<Area>;
    delete(id: number): Promise<void>;
}