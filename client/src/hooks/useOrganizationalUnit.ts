import { useEffect, useState, useCallback } from "react";
import { OrganizationalUnit } from "../types/OrganizationalUnit";
import {
    getOrganizationalUnits,
    getOrganizationalUnitById,
    createOrganizationalUnit,
    updateOrganizationalUnit,
    deleteOrganizationalUnit,
} from "../services/organizationalUnitService";

export const useOrganizationalUnit = () => {
    const [units, setUnits] = useState<OrganizationalUnit[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchUnits();
    }, []);

    const fetchUnits = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getOrganizationalUnits();
            setUnits(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchUnitById = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getOrganizationalUnitById(id);
            return data;
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, []);

    const addUnit = useCallback(async (newOrganizationalUnit: Omit<OrganizationalUnit, "id" | "createdAt">) => {
            setError(null);
            try {
                const createdOrganizationalUnit = await createOrganizationalUnit(newOrganizationalUnit);
                setUnits((prevUnits) => [
                    ...prevUnits,
                    createdOrganizationalUnit,
                ]);
            } catch (err) {
                setError((err as Error).message);
            }
        },
        []
    );

    const editUnit = useCallback(async (id: string, updatedData: Partial<OrganizationalUnit>) => {
            setError(null);
            try {
                const updatedOrganizationalUnit = await updateOrganizationalUnit(id, updatedData);
                setUnits((prevUnits) =>
                    prevUnits.map((unit) =>
                        unit.id === id ? updatedOrganizationalUnit : unit
                    )
                );
            } catch (err) {
                setError((err as Error).message);
            }
        },
        []
    );

    const removeUnit = useCallback(async (id: string) => {
        setError(null);
        try {
            await deleteOrganizationalUnit(id);
            setUnits((prevUnits) =>
                prevUnits.filter((unit) => unit.id !== id)
            );
        } catch (err) {
            setError((err as Error).message);
        }
    }, []);

    return {
        units,
        loading,
        error,
        fetchUnits,
        fetchUnitById,
        addUnit,
        editUnit,
        removeUnit,
    };
};
