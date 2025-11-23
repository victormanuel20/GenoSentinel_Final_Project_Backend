import { TumorTypesService } from './tumor-types.service';
import { TumorTypeResponseOutDto } from './dto/TumorTypeResponse-outDto';
import { CreateTumorTypeInDto } from './dto/create-tumor-type-in.dto';
import { UpdateTumorTypeInDto } from './dto/update-tumor-type-in.dto';
import { SearchTumorTypeInDto } from './dto/SearchTumorTypeInDto';
export declare class TumorTypesController {
    private readonly tumorTypesService;
    constructor(tumorTypesService: TumorTypesService);
    create(createDto: CreateTumorTypeInDto): Promise<TumorTypeResponseOutDto>;
    findAll(): Promise<TumorTypeResponseOutDto[]>;
    search(searchDto: SearchTumorTypeInDto): Promise<TumorTypeResponseOutDto[]>;
    findOne(id: number): Promise<TumorTypeResponseOutDto>;
    update(id: number, updateDto: UpdateTumorTypeInDto): Promise<TumorTypeResponseOutDto>;
    remove(id: number): Promise<{
        message: string;
        success: boolean;
    }>;
}
