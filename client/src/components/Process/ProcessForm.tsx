import { useState } from "react";
import "./ProcessForm.scss";

interface ProcessFormProps {
    onAddProcess: (data: {
        name: string;
        description: string;
        status: string;
        priority: string;
        type: string;
    }) => void;
}

const ProcessForm = ({ onAddProcess }: ProcessFormProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Ativo");
    const [priority, setPriority] = useState("Média");
    const [type, setType] = useState("Manual");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAddProcess({
            name,
            description,
            status,
            priority,
            type,
        });
        setName("");
        setDescription("");
    };

    return (
        <form className='process-form' onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Nome do processo'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                placeholder='Descrição do processo'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value='Ativo'>Ativo</option>
                <option value='Em Desenvolvimento'>Em Desenvolvimento</option>
                <option value='Descontinuado'>Descontinuado</option>
            </select>
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value='Alta'>Alta</option>
                <option value='Media'>Média</option>
                <option value='Baixa'>Baixa</option>
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value='Sistemico'>Sistêmico</option>
                <option value='Manual'>Manual</option>
            </select>
            <button type='submit'>Adicionar Processo</button>
        </form>
    );
};

export default ProcessForm;
