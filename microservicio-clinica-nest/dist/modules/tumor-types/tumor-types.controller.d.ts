import { TumorTypesService } from './tumor-types.service';
import { TumorTypeResponseDto } from './dto/TumorTypeResponseDto';
import { CreateTumorTypeDto } from './dto/create-tumor-type.dto';
export declare class TumorTypesController {
    private readonly tumorTypesService;
    constructor(tumorTypesService: TumorTypesService);
    create(createDto: CreateTumorTypeDto): Promise<TumorTypeResponseDto>;
    findAll(): Promise<TumorTypeResponseDto[]>;
    findOne(id: number): Promise<TumorTypeResponseDto>;
}
