export class Area {
    constructor(
        public id: bigint,
        public name: string,
        public createdAt?: Date
    ) {}

    toJSON() {
        return {
            id: this.id.toString(),
            name: this.name,
            createdAt: this.createdAt?.toISOString() ?? null
        };
    }
}
