import { OrganizationalUnit } from "./OrganizationalUnit";

export class Process {
    constructor(
        public id: bigint,
        public name: string,
        public areaId: bigint,
        public description?: string,
        public documentation?: string,
        public tools?: string,
        public parentId?: bigint | null,
        public status?: ProcessStatus,
        public priority?: ProcessPriority,
        public type?: ProcessType,
        public startDate?: Date,
        public endDate?: Date,
        public createdAt?: Date,
        public responsibles?: OrganizationalUnit[]
    ) {}

    toJSON() {
        return {
            id: this.id.toString(),
            name: this.name,
            description: this.description,
            documentation: this.documentation,
            tools: this.tools,
            areaId: this.areaId.toString(),
            parentId: this.parentId ? this.parentId.toString() : null,
            status: this.status,
            priority: this.priority,
            type: this.type,
            startDate: this.startDate ? this.startDate.toISOString() : null,
            endDate: this.endDate ? this.endDate.toISOString() : null,
            createdAt: this.createdAt ? this.createdAt.toISOString() : null,
            responsibles: this.responsibles || null,
        };
    }
}

export const PROCESS_STATUS_VALUES = ["Concluido", "Em_Desenvolvimento", "Cancelado", "Planejado"] as const;
export type ProcessStatus = (typeof PROCESS_STATUS_VALUES)[number];

export const PROCESS_PRIORITY_VALUES = ["Alta", "Media", "Baixa"] as const;
export type ProcessPriority = (typeof PROCESS_PRIORITY_VALUES)[number];

export const PROCESS_TYPE_VALUES = ["Sistemico", "Manual"] as const;
export type ProcessType = (typeof PROCESS_TYPE_VALUES)[number];
