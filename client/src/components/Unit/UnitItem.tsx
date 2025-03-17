import { useState } from "react";
import { OrganizationalUnit } from "../../types/OrganizationalUnit";
import EditIcon from "../../assets/images/ic_edit.svg";
import DeleteIcon from "../../assets/images/ic_delete.svg";
import SaveIcon from "../../assets/images/ic_save.svg";
import CancelIcon from "../../assets/images/ic_cancel.svg";
import "./UnitItem.scss";

interface UnitItemProps {
    unit: OrganizationalUnit;
    onEditUnit: (
        id: OrganizationalUnit["id"],
        name: string,
        responsible?: string
    ) => void;
    onRemoveUnit: (id: OrganizationalUnit["id"]) => void;
    departments?: OrganizationalUnit[];
}

const UnitItem = ({ unit, onEditUnit, onRemoveUnit, departments = [] }: UnitItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(unit.name);
    const [editParentId, setEditParentId] = useState(unit.parentId || "");

    const handleSave = () => {
        if (!editName.trim()) return;

        // Se editParentId estiver vazio, envia undefined; caso contrário, envia o valor atual
        onEditUnit(unit.id, editName, editParentId || undefined);
        setIsEditing(false);
    };

    return (
        <li className={`unit-item ${isEditing ? "unit-item--editing" : ""}`}>
            <div className='unit-item__content'>

                {/* Nome */}
                <div className='unit-item__col unit-item__col--name'>
                    {isEditing ? (
                        <input
                            type='text'
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className='unit-item__input unit-item__input--name'
                            aria-label='Editar Nome'
                        />
                    ) : (
                        <span className='unit-item__name'>{unit.name}</span>
                    )}
                </div>

                {/* Tipo */}
                <div className='unit-item__col unit-item__col--type'>
                    {unit.parentId ? "Setor" : "Departamento"}
                </div>

                {/* Responsavel */}
                <div className='unit-item__col unit-item__col--responsible'>
                    {isEditing && unit.parentId ? (
                        <select
                            value={editParentId}
                            onChange={(e) => setEditParentId(e.target.value)}
                            className='unit-item__select'
                            aria-label='Selecionar Departamento'
                        >
                            <option value=''>Selecione o Departamento</option>
                            {departments.map((dept) => (  
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <span className='unit-item__responsible'>
                            { unit.parentId ? 
                                departments.find(dept => dept.id === unit.parentId)?.name || "" 
                                : "-0-"
                            }
                        </span>
                    )}
                </div>

                {/* Botoes */}
                <div className='unit-item__actions'>
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className='unit-item__button unit-item__button--save'
                                aria-label='Salvar'
                            >
                                <img src={SaveIcon} alt='Salvar' />
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className='unit-item__button unit-item__button--cancel'
                                aria-label='Cancelar'
                            >
                                <img src={CancelIcon} alt='Cancelar' />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                className='unit-item__button unit-item__button--edit'
                                aria-label='Editar'
                            >
                                <img src={EditIcon} alt='Editar' />
                            </button>
                            <button
                                onClick={() => onRemoveUnit(unit.id)}
                                className='unit-item__button unit-item__button--delete'
                                aria-label='Excluir'
                            >
                                <img src={DeleteIcon} alt='Excluir' />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </li>
    );
};

export default UnitItem;
