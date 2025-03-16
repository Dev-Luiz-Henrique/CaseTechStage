import { useState } from "react";
import { Area } from "../../types/Area";
import EditIcon from "../../assets/images/ic_edit.svg";
import DeleteIcon from "../../assets/images/ic_delete.svg";
import SaveIcon from "../../assets/images/ic_save.svg";
import CancelIcon from "../../assets/images/ic_cancel.svg";
import "./AreaItem.scss";

interface AreaItemProps {
    area: Area;
    onEditArea: (id: Area["id"], name: string) => void;
    onRemoveArea: (id: Area["id"]) => void;
}

const AreaItem = ({ area, onEditArea, onRemoveArea }: AreaItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(area.name);

    const handleSave = () => {
        if (!editName.trim()) return;
        onEditArea(area.id, editName);
        setIsEditing(false);
    };

    return (
        <li className={`area-item ${isEditing ? "area-item--editing" : ""}`}>
            {isEditing ? (
                <>
                    <input
                        type='text'
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className='area-item__input'
                    />
                    <button
                        onClick={handleSave}
                        className='area-item__button area-item__button--save'
                    >
                        <img src={SaveIcon} alt='Salvar' />
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className='area-item__button area-item__button--cancel'
                    >
                        <img src={CancelIcon} alt='Cancelar' />
                    </button>
                </>
            ) : (
                <>
                    <span className='area-item__name'>{area.name}</span>
                    <div className='area-item__actions'>
                        <button
                            onClick={() => setIsEditing(true)}
                            className='area-item__button area-item__button--edit'
                        >
                            <img src={EditIcon} alt='Editar' />
                        </button>
                        <button
                            onClick={() => onRemoveArea(area.id)}
                            className='area-item__button area-item__button--delete'
                        >
                            <img src={DeleteIcon} alt='Excluir' />
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

export default AreaItem;
