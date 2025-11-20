import { TumorTypesService } from './tumor-types.service';
import { TumorTypeResponseDto } from './dto/TumorTypeResponseDto';
import { CreateTumorTypeDto } from './dto/create-tumor-type.dto';
import { UpdateTumorTypeDto } from './dto/update-tumor-type.dto';
export declare class TumorTypesController {
    private readonly tumorTypesService;
    constructor(tumorTypesService: TumorTypesService);
    create(createDto: CreateTumorTypeDto): Promise<TumorTypeResponseDto>;
    findAll(): Promise<TumorTypeResponseDto[]>;
    findOne(id: number): Promise<TumorTypeResponseDto>;
    update(id: number, updateDto: UpdateTumorTypeDto): Promise<TumorTypeResponseDto>;
}
