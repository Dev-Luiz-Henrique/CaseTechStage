import { useState } from "react";
import "./AreaForm.scss";

interface AreaFormProps {
    onAddArea: (name: string) => void;
}

const AreaForm = ({ onAddArea }: AreaFormProps) => {
    const [newAreaName, setNewAreaName] = useState("");

    const handleSubmit = () => {
        if (!newAreaName.trim()) return;
        onAddArea(newAreaName);
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
