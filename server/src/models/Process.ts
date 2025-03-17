export class Process {
    constructor(
        public id: bigint,
        public name: string,
        public areaId: bigint,
        public description?: string,
        public documentation?: string,
        public tools?: string,
        public parentId?: bigint | null,
        public status?: string,     
        public priority?: string,   
        public type?: string,
        public startDate?: Date,
        public endDate?: Date,
        public createdAt?: Date
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
            createdAt: this.createdAt ? this.createdAt.toISOString() : null
        };
    }
}

export type ProcessStatus = "Ativo" | "Em Desenvolvimento" | "Descontinuado";
export type ProcessPriority = "Alta" | "Media" | "Baixa";
export type ProcessType = "Sistemico" | "Manual";
