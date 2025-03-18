import { useProcess } from "../../hooks/useProcess";
import ProcessTree from "../../components/Process/ProcessTree"; 
import "./ProcessesPage.scss";

const ProcessesPage = () => {
    const { processTree, loading, error, addProcess, removeProcess } = useProcess();

    return (
        <div className='processes-page'>
            <h1 className='processes-page__title'>Processos</h1>

            {/* <ProcessForm onAddProcess={(data) => addProcess(data)} /> */}

            {loading && <p className='processes-page__loading-text'>Carregando...</p>}
            {error && <p className='processes-page__error-text'>{error}</p>}

            <ProcessTree
                treeData={processTree}
                onRemoveProcess={removeProcess}
            />
        </div>
    );
};

export default ProcessesPage;
