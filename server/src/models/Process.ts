export class Process {
    constructor(
        public id: bigint,
        public name: string,
        public areaId: bigint,
        public description?: string,
        public documentation?: string,
        public tools?: string,
        public parentId?: bigint | null,
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
            createdAt: this.createdAt ? this.createdAt.toISOString() : null
        };
    }
}
