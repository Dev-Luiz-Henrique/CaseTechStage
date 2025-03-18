import "./ProcessNodeBody.scss";
import { ProcessTreeNodeData } from "../../../types/Process";
import { formatMonthYear } from "../../../utils/dateFormatter";

interface ProcessNodeBodyProps {
    node: ProcessTreeNodeData;
}

const ProcessNodeBody = ({ node }: ProcessNodeBodyProps) => {
    const dateInterval = node.startDate
        ? `${formatMonthYear(node.startDate)} - ${node.endDate ? formatMonthYear(node.endDate) : "N/A"}`
        : "N/A";

    return (
        <div className='process-node-body'>
            
            {/* Descricao */}
            <div className='process-node-body__desc'>
                <span>{node.description}</span>
            </div>

            <div className='process-node-body__info'>

                {/* Responsaveis */}
                <div className='process-node-body__item'>
                    <strong>Responsáveis:</strong>
                    <span>Responsável 1, Responsável 2</span>
                </div>

                <div className='process-node-body__item process-node-body__item--sub'>

                    {/* Tipo */}
                    <div className='process-node-body__subitem'>
                        <strong>Tipo:</strong>
                        <span>{node.type}</span>
                    </div>

                    {/* Data (Intervalo) */}
                    <div className='process-node-body__subitem'>
                        <strong>Data:</strong>
                        <span>{dateInterval}</span>
                    </div>
                </div>

                {/* Ferramentas */}
                <div className='process-node-body__item'>
                    <strong>Ferramentas:</strong>
                    <span>{node.tools}</span>
                </div>

                {/* Documentação */}
                <div className='process-node-body__item'>
                    <strong>Documentação:</strong>
                    <span>{node.documentation}</span>
                </div>
            </div>
        </div>
    );
};

export default ProcessNodeBody;
