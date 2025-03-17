import { OrganizationalUnit } from "../../types/OrganizationalUnit";
import UnitItem from "./UnitItem";
import "./UnitList.scss";

interface UnitListProps {
    units: OrganizationalUnit[];
    onEditUnit: (
        id: OrganizationalUnit["id"],
        name: string,
        responsible?: string
    ) => void;
    onRemoveUnit: (id: OrganizationalUnit["id"]) => void;
    departments: OrganizationalUnit[];
}

const UnitList = ({ units, onEditUnit, onRemoveUnit, departments }: UnitListProps) => {
    return (
        
        <ul className='unit-list'>
            {units.length > 0 ? (
                units.map((unit) => (
                    <UnitItem
                        key={unit.id}
                        unit={unit}
                        onEditUnit={onEditUnit}
                        onRemoveUnit={onRemoveUnit}
                        departments={departments}
                    />
                ))
            ) : (
                <p className='unit-list__empty'>Nenhuma unidade cadastrada.</p>
            )}
        </ul>
    );
};

export default UnitList;