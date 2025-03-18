import { useState } from "react";
import { ProcessTreeNodeData } from "../../../types/Process";
import ProcessTreeNode from "./ProcessNode";
import "./ProcessNodeChildren.scss";

interface ProcessNodeChildrenProps {
    childrenNodes: ProcessTreeNodeData[];
    onRemoveProcess: (id: string) => void;
}

const ProcessNodeChildren = ({ childrenNodes, onRemoveProcess,}: ProcessNodeChildrenProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => { setIsCollapsed(!isCollapsed); };

    return (
        <div className='process-node-children'>

            {/* Cabecalho */}
            <div
                className='process-node-children__header'
                onClick={toggleCollapse}
            >
                <span className='process-node-children__icon'>
                    {isCollapsed ? "►" : "▼"}
                </span>
                <h4 className='process-node-children__title'>Subprocessos</h4>
            </div>

            {/* Conteudo (Subprocessos) */}
            {!isCollapsed && (
                <div className='process-node-children__content'>
                    {childrenNodes.map((child) => (
                        <ProcessTreeNode
                            key={child.id}
                            node={child}
                            onRemoveProcess={onRemoveProcess}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProcessNodeChildren;
