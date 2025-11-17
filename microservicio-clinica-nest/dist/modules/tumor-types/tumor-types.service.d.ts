import { CreateTumorTypeDto } from './dto/create-tumor-type.dto';
import { UpdateTumorTypeDto } from './dto/update-tumor-type.dto';
export declare class TumorTypesService {
    create(createTumorTypeDto: CreateTumorTypeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTumorTypeDto: UpdateTumorTypeDto): string;
    remove(id: number): string;
}
