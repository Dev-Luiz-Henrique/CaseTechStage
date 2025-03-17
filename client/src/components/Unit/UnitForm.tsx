import { useState } from "react";
import { OrganizationalUnit } from "../../types/OrganizationalUnit";
import "./UnitForm.scss";

interface UnitFormProps {
    onAddUnit: (name: string, parentId: string | null) => void;
    departments: OrganizationalUnit[];
}

const UnitForm = ({ onAddUnit, departments }: UnitFormProps) => {
    const [name, setName] = useState("");
    const [isDepartment, setIsDepartment] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validacoes basicas
        if (!name.trim()) return;
        const parentId = isDepartment ? null : selectedDepartment;
        if (!isDepartment && !selectedDepartment) return;

        // Chama a requisicao e limpa os campos
        onAddUnit(name, parentId);
        setName("");
        setIsDepartment(true);
        setSelectedDepartment(null);
    };

    return (
        <form className='unit-form' onSubmit={handleSubmit}>
            {/* Nome da unidade organizacional */}
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nome da unidade'
                className='unit-form__input'
            />

            {/* Tipo da unidade organizacional (Departamento ou Setor) */}
            <div className='unit-form__type'>
                <select
                    className='unit-form__type-select'
                    value={isDepartment ? "departamento" : "setor"}
                    onChange={(e) =>
                        setIsDepartment(e.target.value === "departamento")
                    }
                >
                    <option value='departamento'>Departamento</option>
                    <option value='setor'>Setor</option>
                </select>
            </div>

            {/* Departamento responsavel (Caso seja um setor) */}
            <select
                value={selectedDepartment || ""}
                onChange={(e) => setSelectedDepartment(e.target.value || null)}
                className='unit-form__department-select'
                disabled={isDepartment}
            >
                <option value=''>Selecione o Departamento</option>
                {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                        {dept.name}
                    </option>
                ))}
            </select>

            <button type='submit' className='unit-form__button'>
                Adicionar
            </button>
        </form>
    );
};

export default UnitForm;
