import { Repository } from 'typeorm';
import { CreateTumorTypeInDto } from './dto/create-tumor-type-in.dto';
import { UpdateTumorTypeInDto } from './dto/update-tumor-type-in.dto';
import { TumorType } from './entities/tumor-type.entity';
import { TumorTypeResponseOutDto } from './dto/TumorTypeResponse-outDto';
import { SearchTumorTypeInDto } from './dto/SearchTumorTypeInDto';
export declare class TumorTypesService {
    private readonly tumorTypeRepository;
    constructor(tumorTypeRepository: Repository<TumorType>);
    create(createDto: CreateTumorTypeInDto): Promise<TumorTypeResponseOutDto>;
    findAll(): Promise<TumorTypeResponseOutDto[]>;
    findOne(id: number): Promise<TumorTypeResponseOutDto>;
    update(id: number, updateDto: UpdateTumorTypeInDto): Promise<TumorTypeResponseOutDto>;
    private toResponseDto;
    remove(id: number): Promise<{
        message: string;
        success: boolean;
    }>;
    search(searchDto: SearchTumorTypeInDto): Promise<TumorTypeResponseOutDto[]>;
}
