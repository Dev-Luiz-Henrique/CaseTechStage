import { Area } from "../../types/Area";
import AreaItem from "./AreaItem";
import "./AreaList.scss";

interface AreaListProps {
    areas: Area[];
    onEditArea: (id: Area["id"], name: string) => void;
    onRemoveArea: (id: Area["id"]) => void;
}

const AreaList = ({ areas, onEditArea, onRemoveArea }: AreaListProps) => {
    return (
        <ul className='area-list'>
            {areas.length > 0 ? (
                areas.map((area) => (
                    <AreaItem
                        key={area.id}
                        area={area}
                        onEditArea={onEditArea}
                        onRemoveArea={onRemoveArea}
                    />
                ))
            ) : (
                <p className='area-list__empty'>Nenhuma área cadastrada.</p>
            )}
        </ul>
    );
};

export default AreaList;
