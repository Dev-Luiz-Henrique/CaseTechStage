export class OrganizationalUnit {
    constructor(
        public id: bigint,
        public name: string,
        public parentId?: bigint | null,
        public createdAt?: Date,
        public parentName?: string
    ) {}

    toJSON() {
        const json: any = {
            id: this.id.toString(),
            name: this.name,
            parentId: this.parentId ? this.parentId.toString() : null,
            createdAt: this.createdAt ? this.createdAt.toISOString() : null
        };
        if (this.parentName) json.parentName = this.parentName;
        return json;
    }
}
