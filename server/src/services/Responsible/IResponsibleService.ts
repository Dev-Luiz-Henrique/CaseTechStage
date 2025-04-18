import { Responsible } from "@/models/Responsible";

export interface IResponsibleService {

    getAll(): Promise<Responsible[]>;

    assign(processId: bigint, organizationalUnitId: bigint): Promise<Responsible>;

    unassign(processId: bigint, organizationalUnitId: bigint): Promise<void>;

    getByProcessAndUnit(processId: bigint, organizationalUnitId: bigint): Promise<Responsible>;
}
