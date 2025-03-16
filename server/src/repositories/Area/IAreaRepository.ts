import { Area } from "@/models/Area";

export interface IAreaRepository {

    getAll(): Promise<Area[]>;

    getById(id: bigint): Promise<Area | null>;

    create(name: string): Promise<Area>;

    update(id: bigint, name: string): Promise<Area>;

    delete(id: bigint): Promise<void>;
}
