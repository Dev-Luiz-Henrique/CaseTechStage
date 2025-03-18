import { useProcess } from "../../hooks/useProcess";
import ProcessTree from "../../components/Process/ProcessTree"; 
import "./ProcessesListPage.scss";

const ProcessesPage = () => {
    const { processTree, loading, error, removeProcess } = useProcess();

    return (
        <div className='processes-page'>

            {/* Titulo */}
            <h1 className='processes-page__title'>PROCESSOS</h1>

            {/* Carregando ou Erro */}
            {loading && <p className='processes-page__loading-text'>Carregando...</p>}
            {error && <p className='processes-page__error-text'>{error}</p>}

            {/* Exibicao de processos */}
            <ProcessTree
                treeData={processTree}
                onRemoveProcess={removeProcess}
            />
        </div>
    );
};

export default ProcessesPage;
