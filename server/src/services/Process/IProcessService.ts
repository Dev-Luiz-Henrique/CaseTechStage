import { Area } from "@/models/Area";

export interface IProcessService {

    getAll(): Promise<Area[]>;

    getById(id: bigint): Promise<Area | null>;

    create(data: {
        name: string;
        description?: string;
        documentation?: string;
        tools?: string;
        areaId: bigint;
        parentId?: bigint | null;
    }): Promise<Area>;

    update(id: bigint, data: {
        name?: string;
        description?: string;
        documentation?: string;
        tools?: string;
        areaId?: bigint;
        parentId?: bigint | null;
    }): Promise<Area>;

    delete(id: bigint): Promise<void>;
}
