export class Responsible {
    constructor(
        public processId: bigint,
        public organizationalUnitId: bigint,
        public createdAt?: Date
    ) {}

    toJSON() {
        return {
            processId: this.processId.toString(),
            organizationalUnitId: this.organizationalUnitId.toString(),
            createdAt: this.createdAt ? this.createdAt.toISOString() : null
        };
    }
}
