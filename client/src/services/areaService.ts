import { api } from "./api";
import { Area } from "../types/Area";

export const getAreas = async (): Promise<Area[]> => {
    return api.get("areas").then(res => res.data);
};

export const getAreaById = async (id: string): Promise<Area> => {
    return api.get(`areas/${id}`).then(res => res.data);
};

export const createArea = async (newArea: Omit<Area, "id" | "createdAt">): Promise<Area> => {
    return api.post("areas", newArea).then(res => res.data);
};

export const updateArea = async (id: string, updatedData: Partial<Area>): Promise<Area> => {
    return api.put(`areas/${id}`, updatedData).then(res => res.data);
};

export const deleteArea = async (id: string): Promise<void> => {
    return api.delete(`areas/${id}`).then(res => res.data);
};
