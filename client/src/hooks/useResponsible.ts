import { useEffect, useState, useCallback } from "react";
import { Responsible } from "../types/Responsible";
import {
    getResponsibles,
    getResponsibleByProcessAndUnit,
    assignResponsible,
    unassignResponsible,
} from "../services/responsibleService";
import { extractErrorMessage } from "../services/api";

export const useResponsible = () => {
    const [responsibles, setResponsibles] = useState<Responsible[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchResponsibles();
    }, []);

    const fetchResponsibles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getResponsibles();
            setResponsibles(data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchResponsibleByProcessAndUnit = useCallback(async (processId: string, organizationalUnitId: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getResponsibleByProcessAndUnit(processId, organizationalUnitId);
            return data;
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    const addResponsible = useCallback(
        async (newResponsible: { processId: string; organizationalUnitId: string }) => {
            setError(null);
            try {
                const createdResponsible = await assignResponsible(newResponsible);
                setResponsibles((prev) => [...prev, createdResponsible]);
            } catch (err) {
                setError(extractErrorMessage(err));
            }
        },
        []
    );

    const removeResponsible = useCallback(async (processId: string, organizationalUnitId: string) => {
        setError(null);
        try {
            await unassignResponsible({ processId, organizationalUnitId });
            setResponsibles((prev) =>
                prev.filter(
                    (responsible) =>
                        responsible.processId !== processId ||
                        responsible.organizationalUnitId !== organizationalUnitId
                )
            );
        } catch (err) {
            setError(extractErrorMessage(err));
        }
    }, []);

    return {
        responsibles,
        loading,
        error,
        fetchResponsibles,
        fetchResponsibleByProcessAndUnit,
        addResponsible,
        removeResponsible,
    };
};
