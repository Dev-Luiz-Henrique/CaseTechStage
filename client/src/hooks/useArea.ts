import { useEffect, useState, useCallback } from "react";
import { Area } from "../types/Area";
import {
    getAreas,
    getAreaById,
    createArea,
    updateArea,
    deleteArea,
} from "../services/areaService";
import { extractErrorMessage } from "../services/api";

export const useArea = () => {
    const [areas, setAreas] = useState<Area[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAreas();
    }, []);

    const fetchAreas = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAreas();
            setAreas(data);
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAreaById = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAreaById(id);
            return data;
        } catch (err) {
            setError(extractErrorMessage(err));
        } finally {
            setLoading(false);
        }
    }, []);

    const addArea = useCallback(
        async (newArea: Omit<Area, "id" | "createdAt">) => {
            setError(null);
            try {
                const createdArea = await createArea(newArea);
                setAreas((prevAreas) => [...prevAreas, createdArea]);
            } catch (err) {
                setError(extractErrorMessage(err));
            }
        },
        []
    );

    const editArea = useCallback(
        async (id: string, updatedData: Partial<Area>) => {
            setError(null);
            try {
                const updatedArea = await updateArea(id, updatedData);
                setAreas((prevAreas) =>
                    prevAreas.map((area) =>
                        area.id === id ? updatedArea : area
                    )
                );
            } catch (err) {
                setError(extractErrorMessage(err));
            }
        },
        []
    );

    const removeArea = useCallback(async (id: string) => {
        setError(null);
        try {
            await deleteArea(id);
            setAreas((prevAreas) => prevAreas.filter((area) => area.id !== id));
        } catch (err) {
            setError(extractErrorMessage(err));
        }
    }, []);

    return {
        areas,
        loading,
        error,
        fetchAreas,
        fetchAreaById,
        addArea,
        editArea,
        removeArea,
    };
};
