import { TumorTypesService } from './tumor-types.service';
import { CreateTumorTypeDto } from './dto/create-tumor-type.dto';
import { UpdateTumorTypeDto } from './dto/update-tumor-type.dto';
export declare class TumorTypesController {
    private readonly tumorTypesService;
    constructor(tumorTypesService: TumorTypesService);
    create(createTumorTypeDto: CreateTumorTypeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTumorTypeDto: UpdateTumorTypeDto): string;
    remove(id: string): string;
}
