import { useArea } from "../../hooks/useArea";
import AreaForm from "../../components/Area/AreaForm";
import AreaList from "../../components/Area/AreaList";
import "./AreasPage.scss";

const AreasPage = () => {
    const { areas, loading, error, addArea, editArea, removeArea } = useArea();

    const handleRemoveArea = (id: string) => {
        const msg = "Tem certeza que deseja excluir essa área? Isso vai remover todos os processos associados a ela!";
        if (window.confirm(msg))
            removeArea(id);
    };

    return (
        <div className='areas-page'>
            
            {/* Titulo */}
            <h1 className='areas-page__title'>ÁREAS</h1>

            {/* Formulario de criacao */}
            <AreaForm onAddArea={(name) => addArea({ name })} />

            {/* Carregando ou Erro */}
            {loading && (
                <p className='areas-page__loading-text'>Carregando...</p>
            )}
            {error && <p className='areas-page__error-text'>{error}</p>}

            {/* Exibicao de areas */}
            <AreaList
                areas={areas}
                onEditArea={(id, name) => editArea(id, { name })}
                onRemoveArea={handleRemoveArea}
            />
        </div>
    );
};

export default AreasPage;
