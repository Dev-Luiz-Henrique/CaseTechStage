import { OrganizationalUnit } from "./OrganizationalUnit";

export interface Process {
    id: string;
    name: string;
    description: string;
    documentation: string;
    tools: string;
    areaId: string;
    parentId: string | null;
    status: string;     
    priority: string;    
    type: string;        
    startDate: string;
    endDate: string | null;
    createdAt: string;
    responsibles: OrganizationalUnit[];
}

export interface ProcessTreeNodeData extends Process {
    children?: ProcessTreeNodeData[];
}
