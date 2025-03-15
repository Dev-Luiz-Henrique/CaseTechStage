export class Area {
    constructor(
        public id: bigint,
        public name: string,
        public created_at?: Date
    ) {}

    toJSON() {
        return {
            id: this.id.toString(),
            name: this.name,
            created_at: this.created_at?.toISOString() ?? null
        };
    }
}
