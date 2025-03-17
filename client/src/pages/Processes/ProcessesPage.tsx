import { useProcess } from "../../hooks/useProcess";
import { ProcessTreeNode } from "../../utils/buildProcessTree";

const renderProcessTree = (processTree: ProcessTreeNode[]) => {
    return processTree.map((process) => (
        <div
            key={process.id}
            style={{
                marginLeft: "20px",
                borderLeft: "2px solid #ccc",
                paddingLeft: "10px",
            }}
        >
            <h3>{process.name}</h3>
            <p>{process.description}</p>
            <p>Status: {process.status}</p>
            <p>Prioridade: {process.priority}</p>
            <p>Tipo: {process.type}</p>

            {process.children && process.children.length > 0 && (
                <div>{renderProcessTree(process.children)}</div>
            )}
        </div>
    ));
};

const ProcessesPage = () => {
    const { processTree, loading, error } = useProcess();

    return (
        <div className='processes-page'>
            <h1>Processos</h1>

            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}

            <div>{renderProcessTree(processTree)}</div>
        </div>
    );
};

export default ProcessesPage;
