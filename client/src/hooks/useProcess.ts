import { useEffect, useState, useCallback } from "react";
import { Process } from "../types/Process";
import { buildProcessTree, ProcessTreeNode } from "../utils/buildProcessTree";
import {
    getProcesses,
    getProcessById,
    createProcess,
    updateProcess,
    deleteProcess,
} from "../services/processService";
import { extractErrorMessage } from "../services/api";

export const useProcess = () => {
    const [processes, setProcesses] = useState<Process[]>([]);
    const [processTree, setProcessTree] = useState<ProcessTreeNode[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProcesses();
    }, []);

    const fetchProcesses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getProcesses();
            setProcesses(data);
            setProcessTree(buildProcessTree(data));
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchProcessById = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getProcessById(id);
            return data;
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    const addProcess = useCallback(async (newProcess: Omit<Process, "id" | "createdAt">) => {
            setError(null);
            try {
                const createdProcess = await createProcess(newProcess);
                setProcesses((prevProcesses) => [
                    ...prevProcesses,
                    createdProcess,
                ]);
                return createdProcess;
            } catch (err) {
                setError(extractErrorMessage(err));
            }
        },
        []
    );

    const editProcess = useCallback(async (id: string, updatedData: Partial<Process>) => {
            setError(null);
            try {
                const updatedProcess = await updateProcess(id, updatedData);
                setProcesses((prevProcesses) =>
                    prevProcesses.map((process) =>
                        process.id === id ? updatedProcess : process
                    )
                );
                return updatedProcess;
            } catch (err) {
                setError(extractErrorMessage(err));
            }
        },
        []
    );

    const removeProcess = useCallback(async (id: string) => {
        setError(null);
        try {
            await deleteProcess(id);
            setProcesses((prevProcesses) =>
                prevProcesses.filter((process) => process.id !== id)
            );
        } catch (err) {
            setError(extractErrorMessage(err));
        }
    }, []);

    return {
        processes,
        processTree,
        loading,
        error,
        fetchProcesses,
        fetchProcessById,
        addProcess,
        editProcess,
        removeProcess,
    };
};
