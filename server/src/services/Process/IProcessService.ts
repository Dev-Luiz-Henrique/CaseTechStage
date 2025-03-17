import { Process, ProcessStatus, ProcessPriority, ProcessType } from "@/models/Process";

export type ProcessBaseData = {
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
};

export interface IProcessService {
    getAll(): Promise<Process[]>;

    getById(id: bigint): Promise<Process | null>;

    create(data: ProcessBaseData): Promise<Process>;

    update(id: bigint, data: Partial<ProcessBaseData>): Promise<Process>;

    delete(id: bigint): Promise<void>;
}
