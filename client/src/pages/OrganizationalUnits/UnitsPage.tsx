import { useOrganizationalUnit } from "../../hooks/useOrganizationalUnit";
import UnitForm from "../../components/Unit/UnitForm";
import UnitList from "../../components/Unit/UnitList";
import "./UnitsPage.scss";

const UnitsPage = () => {
    const { units, loading, error, addUnit, editUnit, removeUnit } = useOrganizationalUnit();

    // Filtra apenas os departamentos (unidades sem parentId)
    const departments = units.filter((unit) => unit.parentId === null);

    return (
        <div className='units-page'>

            {/* Titulo */}
            <h1 className='units-page__title'>UNIDADES ORGANIZACIONAIS</h1>

            {/* Formulario de criacao */}
            <UnitForm
                onAddUnit={(name, parentId) => addUnit({ name, parentId })}
                departments={departments}
            />

            {/* Carregando ou Erro */}
            {loading && (
                <p className='units-page__loading-text'>Carregando...</p>
            )}
            {error && <p className='units-page__error-text'>{error}</p>}

            {/* Exibicao de unidades organizacionais */}
            <UnitList
                units={units}
                onEditUnit={(id, name, parentId) => editUnit(id, { name, parentId })}
                onRemoveUnit={removeUnit}
                departments={departments}
            />
        </div>
    );
};

export default UnitsPage;
