import { api } from "./api";
import { OrganizationalUnit } from "../types/OrganizationalUnit";

export const getOrganizationalUnits = async (): Promise<OrganizationalUnit[]> => {
    return api.get("organizational-units").then(res => res.data);
};

export const getOrganizationalUnitById = async (id: string): Promise<OrganizationalUnit> => {
    return api.get(`organizational-units/${id}`).then(res => res.data);
};

export const createOrganizationalUnit = 
    async (newOrganizationalUnit: Omit<OrganizationalUnit, "id" | "createdAt">): Promise<OrganizationalUnit> => {
    
    return api.post("organizational-units", newOrganizationalUnit).then(res => res.data);
};

export const updateOrganizationalUnit = 
    async (id: string, updatedData: Partial<OrganizationalUnit>): Promise<OrganizationalUnit> => {
    
    return api.put(`organizational-units/${id}`, updatedData).then(res => res.data);
};

export const deleteOrganizationalUnit = async (id: string): Promise<void> => {
    return api.delete(`organizational-units/${id}`).then(res => res.data);
};
