import { api } from "./api";
import { Process } from "../types/Process";

export const getProcesses = async (): Promise<Process[]> => {
    return api.get("/processes").then((res) => res.data);
};

export const getProcessById = async (id: string): Promise<Process> => {
    return api.get(`/processes/${id}`).then((res) => res.data);
};

export const createProcess = async (process: Omit<Process, "id" | "createdAt">): Promise<Process> => {
    return api.post("/processes", process).then((res) => res.data);
};

export const updateProcess = async (id: string,process: Partial<Process>): Promise<Process> => {
    return api.put(`/processes/${id}`, process).then((res) => res.data);
};

export const deleteProcess = async (id: string): Promise<void> => {
    return api.delete(`/processes/${id}`).then((res) => res.data);
};
