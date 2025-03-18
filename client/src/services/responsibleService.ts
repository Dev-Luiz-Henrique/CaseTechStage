import { api } from "./api";
import { Responsible } from "../types/Responsible";

export const getResponsibles = async (): Promise<Responsible[]> => {
    return api.get("/responsibles").then((res) => res.data);
};

export const getResponsibleByProcessAndUnit = async (
    processId: string, organizationalUnitId: string): Promise<Responsible> => {
    
    return api.get(`/responsibles/${processId}/${organizationalUnitId}`).then((res) => res.data);
};

export const assignResponsible = async (
    responsible: { processId: string; organizationalUnitId: string }): Promise<Responsible> => {
    
    return api.post("/responsibles/assign", responsible).then((res) => res.data);
};

export const unassignResponsible = async (
    responsible: { processId: string; organizationalUnitId: string }): Promise<void> => {
    
    return api.post("/responsibles/unassign", responsible).then((res) => res.data);
};
