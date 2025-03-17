import { Process, ProcessStatus, ProcessPriority, ProcessType } from "@/models/Process";

export interface IProcessRepository {
    getAll(): Promise<Process[]>;

    getById(id: bigint): Promise<Process | null>; 
    
    create(data: {
        name: string;
        description?: string | null;
        documentation?: string | null;
        tools?: string | null;
        areaId: bigint; 
        parentId?: bigint | null;
        status?: ProcessStatus;
        priority?: ProcessPriority;
        type?: ProcessType;
        startDate?: Date;
        endDate?: Date;
    }): Promise<Process>;

    update(id: bigint, data: {
        name?: string;
        description?: string | null;
        documentation?: string | null;
        tools?: string | null;
        areaId?: bigint;
        parentId?: bigint | null;
        status?: ProcessStatus;
        priority?: ProcessPriority;
        type?: ProcessType;
        startDate?: Date;
        endDate?: Date;
    }): Promise<Process>;

    delete(id: bigint): Promise<void>; 
}
