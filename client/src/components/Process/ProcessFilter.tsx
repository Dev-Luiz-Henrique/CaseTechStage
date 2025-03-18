import { useState } from "react";
import { useOrganizationalUnit } from "../../hooks/useOrganizationalUnit";
import "./ProcessFilter.scss";

export interface Filters {
    name: string;
    responsible: string;
    priority: string;
    startDate: string;
    endDate: string;
    type: string;
    status: string;
}

interface FilterProps {
    onFilterChange: (filters: Filters) => void;
}

const ProcessFilter = ({ onFilterChange }: FilterProps) => {
    const [filters, setFilters] = useState<Filters>({
        name: "",
        responsible: "",
        priority: "",
        startDate: "",
        endDate: "",
        type: "",
        status: "",
    });

    const { units, loading: unitsLoading, error: unitsError } = useOrganizationalUnit();

    const handleChange = (field: keyof Filters, value: string) => {
        const updatedFilters = { ...filters, [field]: value };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    return (
        <div className='process-filter'>

            {/* Nome */}
            <input
                type='text'
                placeholder='Nome do Processo'
                value={filters.name}
                onChange={(e) => handleChange("name", e.target.value)}
            />

            {/* Responsavel (Unidade Organizacional) */}
            <select
                value={filters.responsible}
                onChange={(e) => handleChange("responsible", e.target.value)}
            >
                <option value=''>Todos Responsáveis</option>
                {unitsLoading && <option disabled>Carregando...</option>}
                {unitsError && <option disabled>Erro ao carregar</option>}
                {units.map((unit) => (
                    <option key={unit.id} value={unit.name}>
                        {unit.name}
                    </option>
                ))}
            </select>

            {/* Prioridade */}
            <select
                value={filters.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
            >
                <option value=''>Todas Prioridades</option>
                <option value='Alta'>Alta</option>
                <option value='Média'>Média</option>
                <option value='Baixa'>Baixa</option>
            </select>

            {/* Tipo */}
            <select
                value={filters.type}
                onChange={(e) => handleChange("type", e.target.value)}
            >
                <option value=''>Todos Tipos</option>
                <option value='Sistemico'>Sistêmico</option>
                <option value='Manual'>Manual</option>
            </select>

            {/* Status */}
            <select
                value={filters.status}
                onChange={(e) => handleChange("status", e.target.value)}
            >
                <option value=''>Todos Status</option>
                <option value='Concluido'>Concluído</option>
                <option value='Em_Andamento'>Em andamento</option>
                <option value='Cancelado'>Cancelado</option>
                <option value='Planejado'>Planejado</option>
            </select>

            {/* Data inicio */}
            <input
                type='month'
                value={filters.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
            />
        </div>
    );
};

export default ProcessFilter;
