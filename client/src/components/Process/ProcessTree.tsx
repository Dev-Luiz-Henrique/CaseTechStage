import { ProcessTreeNodeData } from "../../types/Process";
import ProcessTreeNode from "./ProcessNode/ProcessNode";
import "./ProcessTree.scss";

interface ProcessTreeProps {
    treeData: ProcessTreeNodeData[];
    onRemoveProcess: (id: string) => void;
}

const ProcessTree = ({ treeData, onRemoveProcess }: ProcessTreeProps) => {
    return (
        <div className='process-tree'>

            {/* Lista de processos */}
            {treeData.length > 0 ? (
                treeData.map((node) => (
                    <ProcessTreeNode
                        key={node.id}
                        node={node}
                        onRemoveProcess={onRemoveProcess}
                    />
                ))
            ) : (
                <p className='process-tree__empty'>
                    Nenhum processo cadastrado.
                </p>
            )}
        </div>
    );
};

export default ProcessTree;
