import { Process } from "../../types/Process";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProcess } from "../../hooks/useProcess";
import { useArea } from "../../hooks/useArea";
import { useOrganizationalUnit } from "../../hooks/useOrganizationalUnit";
import { useResponsible } from "../../hooks/useResponsible";
import ProcessForm from "../../components/Process/ProcessForm";

const ProcessFormPage = () => {
    // Pega o id da URL; se existir, é uma edição.
    const { id } = useParams<{ id?: string }>();

    const {
        processes,
        fetchProcessById,
        addProcess,
        editProcess,
        loading: processLoading,
        error: processError,
    } = useProcess();
    const { areas, loading: areasLoading, error: areasError } = useArea();
    const { units, loading: orgUnitsLoading, error: orgUnitsError } = useOrganizationalUnit();
    const { addResponsible, error: responsibleError } = useResponsible();

    const [initialData, setInitialData] = useState<Process | null>(null);

    useEffect(() => {
        if (id)
            fetchProcessById(id).then((data) => setInitialData(data ?? null));
    }, [id, fetchProcessById]);

    const handleSubmit = async (data: Process) => {
        // Cria ou edita o processo
        const savedProcess = id
            ? await editProcess(id, data)
            : await addProcess(data);

        if (!savedProcess)
            throw new Error("Erro ao salvar o processo.");

        // Com o processo salvo, atribui os responsaveis
        data.responsibles.forEach(async (unit) => {
            await addResponsible({
                processId: savedProcess.id,
                organizationalUnitId: unit.id,
            });
        });
    };
      
    return (
        <div className='process-form-page'>
            {/* Título */}
            <h1>{id ? "Editar Processo" : "Criar Processo"}</h1>

            {/* Carregamentos */}
            {processLoading && <p>Carregando processos...</p>}
            {areasLoading && <p>Carregando áreas...</p>}
            {orgUnitsLoading && <p>Carregando unidades organizacionais...</p>}
            
            {/* Erros */}
            {processError && (
                <p className='error'>Erro ao carregar processos: {processError}</p>
            )}
            {areasError && (
                <p className='error'>Erro ao carregar áreas: {areasError}</p>
            )}
            {orgUnitsError && (
                <p className='error'>Erro ao carregar unidades organizacionais: {orgUnitsError}</p>
            )}
            {responsibleError && (
                <p className='error'>Erro ao atribuir responsáveis: {responsibleError}</p>
            )}

            {/* Formulario */}
            <ProcessForm
                initialData={initialData}
                onSubmit={handleSubmit}
                organizationalUnits={units || []}
                areas={areas || []}
                parentProcesses={
                    id ? processes.filter((p) => p.id !== id) : (processes || [])
                }
            />
        </div>
    );
};

export default ProcessFormPage;
