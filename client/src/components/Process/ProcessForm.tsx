import { useState, useEffect } from "react";
import { Area } from "../../types/Area";
import { Process } from "../../types/Process";
import { OrganizationalUnit } from "../../types/OrganizationalUnit";
import "./ProcessForm.scss";

interface ProcessFormProps {
    initialData?: Process | null;
    onSubmit: (data: Process) => void;
    organizationalUnits: OrganizationalUnit[];
    areas: Area[];
    parentProcesses: Process[];
}

const ProcessForm = ({
    initialData,
    onSubmit,
    organizationalUnits,
    areas,
    parentProcesses,
}: ProcessFormProps) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [documentation, setDocumentation] = useState("");
    const [tools, setTools] = useState("");
    const [areaId, setAreaId] = useState("");
    const [parentId, setParentId] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Armazena os IDs das unidades organizacionais selecionadas como responsáveis
    const [responsibles, setResponsibles] = useState<string[]>([]);

    useEffect(() => {
        // Caso seja uma edicao, carrega os dados
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description);
            setDocumentation(initialData.documentation);
            setTools(initialData.tools);
            setAreaId(initialData.areaId);
            setParentId(initialData.parentId || "");
            setStatus(initialData.status);
            setPriority(initialData.priority);
            setType(initialData.type);
            setStartDate(initialData.startDate);
            setEndDate(initialData.endDate || "");
            setResponsibles(initialData.responsibles.map((unit) => unit.id));
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("O nome do processo é obrigatório.");
            return;
        }
        if (!areaId) {
            alert("Por favor, selecione uma Área do Projeto.");
            return;
        }
        if (!status) {
            alert("Por favor, selecione um Status.");
            return;
        }
        if (!priority) {
            alert("Por favor, selecione uma Prioridade.");
            return;
        }
        if (!type) {
            alert("Por favor, selecione um Tipo.");
            return;
        }
        if (!startDate) {
            alert("A Data de Início é obrigatória.");
            return;
        }

        // Mapeia os responsaveis selecionados para os objetos completos
        const selectedResponsibles = organizationalUnits.filter((unit) =>
            responsibles.includes(unit.id)
        );

        const processData: Process = {
            id: initialData?.id || "", // Em criacao, o backend gera o ID
            name,
            description,
            documentation,
            tools,
            areaId,
            parentId: parentId || null,
            status,
            priority,
            type,
            startDate,
            endDate: endDate || null,
            createdAt: initialData?.createdAt || new Date().toISOString(),
            responsibles: selectedResponsibles,
        };

        try {
            await onSubmit(processData);

            if (!initialData) {
                setName("");
                setDescription("");
                setDocumentation("");
                setTools("");
                setAreaId("");
                setParentId("");
                setStatus("");
                setPriority("");
                setType("");
                setStartDate("");
                setEndDate("");
                setResponsibles([]);
            }
        } catch (error) {
            console.error("Erro ao submeter o formulário:", error);
        }
    };

    return (
        <form className='process-form' onSubmit={handleSubmit}>

            {/* Nome */}
            <div className='process-form__row'>
                <input
                    type='text'
                    className='process-form__input'
                    placeholder='Nome do processo'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            {/* Descricao */}
            <div className='process-form__row'>
                <textarea
                    className='process-form__textarea'
                    placeholder='Descrição do processo'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>

            {/* Documentacao e Ferramentas */}
            <div className='process-form__row process-form__row--inline'>
                <textarea
                    className='process-form__textarea'
                    placeholder='Documentação'
                    value={documentation}
                    onChange={(e) => setDocumentation(e.target.value)}
                ></textarea>
                <textarea
                    className='process-form__textarea'
                    placeholder='Ferramentas'
                    value={tools}
                    onChange={(e) => setTools(e.target.value)}
                ></textarea>
            </div>

            {/* Area e Processo Pai */}
            <div className='process-form__row process-form__row--inline'>
                <select
                    className='process-form__select'
                    value={areaId}
                    onChange={(e) => setAreaId(e.target.value)}
                >
                    <option value='' disabled>Selecione a Área do Projeto</option>
                    {areas.map((area) => (
                        <option key={area.id} value={area.id}>
                            {area.name}
                        </option>
                    ))}
                </select>
                <select
                    className='process-form__select'
                    value={parentId}
                    onChange={(e) => setParentId(e.target.value)}
                >
                    <option value=''>
                        Processo Pai (deixe em branco para processo raiz)
                    </option>
                    {parentProcesses.map((process) => (
                        <option key={process.id} value={process.id}>
                            {process.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Status, Prioridade e Tipo */}
            <div className='process-form__row process-form__row--inline'>
                <select
                    className='process-form__select'
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value='' disabled>Selecione o Status</option>
                    <option value='Planejado'>Planejado</option>
                    <option value='Em_Andamento'>Em Andamento</option>
                    <option value='Concluido'>Concluído</option>
                    <option value='Cancelado'>Cancelado</option>
                </select>
                <select
                    className='process-form__select'
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value='' disabled>Selecione a Prioridade</option>
                    <option value='Alta'>Alta</option>
                    <option value='Media'>Média</option>
                    <option value='Baixa'>Baixa</option>
                </select>
                <select
                    className='process-form__select'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option value='' disabled>Selecione o Tipo</option>
                    <option value='Sistemico'>Sistêmico</option>
                    <option value='Manual'>Manual</option>
                </select>
            </div>

            {/* Datas de Inicio e Termino */}
            <div className='process-form__row process-form__row--inline'>
                <input
                    type='date'
                    className='process-form__input'
                    placeholder='Data de início'
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type='date'
                    className='process-form__input'
                    placeholder='Data de término'
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            {/* Responsaveis */}
            <div className='process-form__row'>
                <select
                    multiple
                    className='process-form__select'
                    value={responsibles}
                    onChange={(e) => {
                        const options = e.target.options;
                        const selected: string[] = [];
                        for (let i = 0; i < options.length; i++) {
                            if (options[i].selected) {
                                selected.push(options[i].value);
                            }
                        }
                        setResponsibles(selected);
                    }}
                >
                    {organizationalUnits.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                            {unit.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Botao de Submissao */}
            <div className='process-form__row process-form__row--submit'>
                <button type='submit' className='process-form__button'>
                    {initialData ? "Salvar Alterações" : "Adicionar Processo"}
                </button>
            </div>
        </form>
    );
};

export default ProcessForm;
