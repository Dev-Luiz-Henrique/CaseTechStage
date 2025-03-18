import { useNavigate } from "react-router-dom";
import { ProcessTreeNodeData } from "../../../types/Process";
import ProcessTreeNodeHeader from "./ProcessNodeHeader";
import ProcessTreeNodeBody from "./ProcessNodeBody";
import ProcessTreeNodeChildren from "./ProcessNodeChildren";
import "./ProcessNode.scss";

interface ProcessTreeNodeProps {
    node: ProcessTreeNodeData;
    onRemoveProcess: (id: string) => void;
}

const ProcessTreeNode = ({ node, onRemoveProcess }: ProcessTreeNodeProps) => {
    const navigate = useNavigate();

    const getPriorityColor = () => {
        if (node.status.toLowerCase() === "concluido") return "gray";

        return { alta: "red", baixa: "green" }[node.priority.toLowerCase()] || "orange";
    };
    
    const handleEditRedirect = () => {
        navigate(`/editar-processo/${node.id}`);
    };

    return (
        <div className='process-tree-node'>

            {/* Cartao de exibicao */}
            <div className='process-tree-node__card'>

                {/* Cor da prioridade */}
                <div
                    className='process-tree-node__priority-stripe'
                    style={{ backgroundColor: getPriorityColor() }}
                />

                {/* Cabecalho */}
                <ProcessTreeNodeHeader
                    onEdit={handleEditRedirect}
                    onDelete={() => onRemoveProcess(node.id)}
                    name={node.name}
                    status={node.status}
                />

                {/* Conteudo */}
                <ProcessTreeNodeBody node={node} />
            </div>

            {/* Subprocesso */}
            {node.children && node.children.length > 0 && (
                <ProcessTreeNodeChildren
                    childrenNodes={node.children}
                    onRemoveProcess={onRemoveProcess}
                />
            )}
        </div>
    );
};

export default ProcessTreeNode;
