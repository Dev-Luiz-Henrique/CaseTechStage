import { useProcess } from "../../hooks/useProcess";
import ProcessTree from "../../components/Process/ProcessTree"; 
import "./ProcessesListPage.scss";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import ProcessFilter, { Filters } from "../../components/Process/ProcessFilter";

const ProcessesPage = () => {
    const { processTree, loading, error, removeProcess } = useProcess();
    const [filters, setFilters] = useState<Filters>({
        name: "",
        responsible: "",
        priority: "",
        startDate: "",
        endDate: "",
        type: "",
        status: "",
        area: "",
    });

    // Funcao recursiva para filtrar a arvore completa
    const filterProcessTree = (nodes: any[]): any[] => {
        return nodes.reduce((filtered: any[], node) => {

            // Verifica se o no atual atende aos criterios
            const matchesName = filters.name
                ? node.name.toLowerCase().includes(filters.name.toLowerCase())
                : true;

            const matchesResponsible = filters.responsible
                ? node.responsibles &&
                  node.responsibles.some((unit: any) =>
                      unit.name.toLowerCase().includes(filters.responsible.toLowerCase())
                  )
                : true;

            const matchesPriority = filters.priority
                ? node.priority === filters.priority
                : true;

            const matchesStartDate = filters.startDate
                ? new Date(node.startDate) >= new Date(filters.startDate)
                : true;

            const matchesType = filters.type
                ? node.type === filters.type
                : true;
                
            const matchesStatus = filters.status
                ? node.status === filters.status
                : true;

            const matchesArea = filters.area
                ? node.areaId === filters.area
                : true;
            
            const matchesSelf =
                matchesName &&
                matchesResponsible &&
                matchesPriority &&
                matchesStartDate &&
                matchesType &&
                matchesStatus &&
                matchesArea;

            // Aplica filtragem recursivamente nos filhos (se existirem)
            let filteredChildren = [];
            if (node.children && node.children.length > 0)
                filteredChildren = filterProcessTree(node.children);

            // Se o no atual ou algum filho corresponder, inclui o no mantendo a hierarquia
            if (matchesSelf || filteredChildren.length > 0) {
                filtered.push({
                    ...node,
                    children: filteredChildren,
                });
            }

            return filtered;
        }, []);
    };

    // Memoiza os dados filtrados para evitar recomputacoes desnecessarias
    const filteredTreeData = useMemo(() => {
        if (!processTree) return [];
        return filterProcessTree(processTree);
    }, [filters, processTree]);

    return (
        <div className='processes-page'>

            {/* Titulo e Botao de criacao */}
            <div className='processes-page__header'>
                <h1 className='processes-page__title'>PROCESSOS</h1>
                <Link to='/processes/manage/' className='processes-page__create-button'>
                    Novo Processo
                </Link>
            </div>

            {/* Filtros */}
            <ProcessFilter onFilterChange={setFilters} />

            {/* Carregando ou Erro */}
            {loading && (
                <p className='processes-page__loading-text'>Carregando...</p>
            )}
            {error && <p className='processes-page__error-text'>{error}</p>}

            {/* Exibicao de processos */}
            <ProcessTree
                treeData={filteredTreeData}
                onRemoveProcess={removeProcess}
            />
        </div>
    );
};

export default ProcessesPage;
