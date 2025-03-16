import { Area } from "@/models/Area";

export interface IAreaService {

    getAll(): Promise<Area[]>;

    getById(id: bigint): Promise<Area>; 

    create(name: string): Promise<Area>;

    update(id: bigint, name: string): Promise<Area>; 
    
    delete(id: bigint): Promise<void>; 
}
