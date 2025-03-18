import "./ProcessNodeHeader.scss";
import EditIcon from "../../../assets/images/ic_edit.svg";
import DeleteIcon from "../../../assets/images/ic_delete.svg";

interface ProcessNodeHeaderProps {
    name: string;
    status: string;
    onEdit: () => void;
    onDelete: () => void;
}

const ProcessNodeHeader = ({ name, status, onEdit, onDelete }: ProcessNodeHeaderProps) => {
    return (
        <div className='process-node-header'>

            {/* Nome */}
            <h3 className='process-node-header__name'>{name}</h3>

            {/* Status */}
            <div className='process-node-header__status'>
                <span>{status.replace(/_/g, " ")}</span>
            </div>

            {/* Botoes */}
            <div className='process-node-header__actions'>

                {/* Botao editar */}
                <button
                    onClick={onEdit}
                    className='process-node-header__button process-node-header__button--edit'
                >
                    <img src={EditIcon} alt='Editar' />
                </button>

                {/* Botao deletar */}
                <button
                    onClick={onDelete}
                    className='process-node-header__button process-node-header__button--delete'
                >
                    <img src={DeleteIcon} alt='Excluir' />
                </button>
            </div>
        </div>
    );
};

export default ProcessNodeHeader;
