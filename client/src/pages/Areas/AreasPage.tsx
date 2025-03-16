import { useArea } from "../../hooks/useArea";
import AreaForm from "../../components/Area/AreaForm";
import AreaList from "../../components/Area/AreaList";
import "./AreasPage.scss";

const AreasPage = () => {
    const { areas, loading, error, addArea, editArea, removeArea } = useArea();

    return (
        <div className='areas-page'>
            <h1 className='areas-page__title'>Áreas</h1>

            <AreaForm onAddArea={(name) => addArea({ name })} />

            {loading && (
                <p className='areas-page__loading-text'>Carregando...</p>
            )}
            {error && <p className='areas-page__error-text'>{error}</p>}

            <AreaList
                areas={areas}
                onEditArea={(id, name) => editArea(id, { name })}
                onRemoveArea={removeArea}
            />
        </div>
    );
};

export default AreasPage;
