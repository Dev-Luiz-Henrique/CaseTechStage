import { Responsible } from "@/models/Responsible";

export interface IResponsibleRepository {

    getAll(): Promise<Responsible[]>;

    assign(processId: bigint, organizationalUnitId: bigint): Promise<Responsible>;
    
    unassign(processId: bigint, organizationalUnitId: bigint): Promise<void>;
}
