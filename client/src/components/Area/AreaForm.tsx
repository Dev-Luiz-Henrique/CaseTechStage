import { useState } from "react";
import "./AreaForm.scss";
import { Area } from "../../types/Area";

interface AreaFormProps {
    onAddArea: (name: string) => Promise<Area | undefined>;
}

const AreaForm = ({ onAddArea }: AreaFormProps) => {
    const [newAreaName, setNewAreaName] = useState("");

    const handleSubmit = async () => {
        if (!newAreaName.trim()) return;
        const result = await onAddArea(newAreaName);
        if (result)
            setNewAreaName("");
    };

    return (
        <div className='area-form'>
            <input
                type='text'
                placeholder='Nova Área'
                value={newAreaName}
                onChange={(e) => setNewAreaName(e.target.value)}
                className='area-form__input'
            />
            <button
                onClick={handleSubmit}
                className='area-form__button'
                aria-label='Adicionar área'
            >
                Adicionar
            </button>
        </div>
    );
};

export default AreaForm;
