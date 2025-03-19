import { Process } from "../../types/Process";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProcess } from "../../hooks/useProcess";
import { useArea } from "../../hooks/useArea";
import { useOrganizationalUnit } from "../../hooks/useOrganizationalUnit";
import { useResponsible } from "../../hooks/useResponsible";
import ProcessForm from "../../components/Process/ProcessForm";
import "./ProcessesFormPage.scss"

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
            <h1 className='process-form-page__title'>{id ? "Editar Processo" : "Criar Processo"}</h1>

            {/* Carregamentos */}
            {processLoading && <p className='process-form-page__loading-text'>Carregando processos...</p>}
            {areasLoading && <p className='process-form-page__loading-text'>Carregando áreas...</p>}
            {orgUnitsLoading && <p className='process-form-page__loading-text'>Carregando unidades organizacionais...</p>}

            {/* Erros */}
            {processError && (
                <p className='process-form-page__error-text'>Ocorreu um erro no processo: {processError}</p>
            )}
            {areasError && (
                <p className='process-form-page__error-text'>Ocorreu um erro na área: {areasError}</p>
            )}
            {orgUnitsError && (
                <p className='process-form-page__error-text'>Ocorreu um erro nas unidades organizacionais: {orgUnitsError}</p>
            )}
            {responsibleError && (
                <p className='process-form-page__error-text'>Ocorreu um erro nos responsáveis: {responsibleError}</p>
            )}

            {/* Formulário */}
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
