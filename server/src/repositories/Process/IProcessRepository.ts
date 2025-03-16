import { Process } from "@/models/Process";

export interface IProcessRepository {

    getAll(): Promise<Process[]>;

    getById(id: bigint): Promise<Process | null>; 
    
    create(data: {
        name: string;
        description?: string;
        documentation?: string;
        tools?: string;
        areaId: bigint; 
        parentId?: bigint | null; 
    }): Promise<Process>;

    update(id: bigint, data: {
        name?: string;
        description?: string;
        documentation?: string;
        tools?: string;
        areaId?: bigint;
        parentId?: bigint | null;
    }): Promise<Process>;

    delete(id: bigint): Promise<void>; 
}
